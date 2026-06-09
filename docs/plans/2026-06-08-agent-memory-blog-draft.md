# Agents Do Not Need More Memory. They Need Better State.
Created: 2026-06-08
Status: compressed narrative rewrite
Source plan: [2026-06-07-agent-memory-blog-plan.md](2026-06-07-agent-memory-blog-plan.md)

## Draft

An agent is a loop:

```text
observe -> think -> act -> observe -> ...
```

The model inside the loop is mostly stateless. The harness around it is not. It stores files, tool outputs, summaries, preferences, instructions, traces, embeddings, graph edges, and session histories.

We call all of this "memory." That is too coarse.

The useful question is not whether the agent has memory. The useful question is:

> What state crosses the boundary between two runs, and why should the next run trust it?

The whole post is one equation:

```text
agent memory = write policy + store + retrieval policy + validation loop
```

The store is the least interesting term. Markdown, SQLite, vector search, graph databases, mounted filesystems, and managed APIs can all work. The hard part is deciding what gets written, when it is retrieved, what authority it has, and how it is updated or forgotten.

A memory system is good only when a future action changes correctly, with source, scope, and deletion still intact.

### First, Split The Word

Most memory discussions mix four mechanisms.

| Mechanism | What it means | Examples | Common failure |
| --- | --- | --- | --- |
| Context | What the model sees now | prompt, files, tool output | too large or stale |
| Compaction | What survives context pressure | session summaries | lost intent |
| Durable memory | External state reused later | preferences, repo rules, skills | stale authority |
| Learning | Changed model/policy | weights, fine-tuning | usually not present |

Coding agents add a second split:

```text
context pressure    = keep this run alive
session continuity  = keep this task coherent
durable memory      = change what a future run can know
```

Do not use long-term memory to solve context overflow. Use compaction for that. Durable memory starts when the harness decides state should cross a session boundary.

### The Pipeline

```mermaid
flowchart LR
  E["Event"] --> C["Capture"]
  C --> X["Extract"]
  X --> T["Classify"]
  T --> P["Scope"]
  P --> S["Store"]
  S --> R["Retrieve"]
  R --> I["Inject / cite"]
  I --> A["Act"]
  A --> V["Validate"]
  V --> M["Merge / prune / delete"]
  M --> S
```

Each edge is policy.

| Stage | Decision | Bad default |
| --- | --- | --- |
| Capture | What is a candidate? | save everything |
| Extract | What stable signal exists? | summarize vaguely |
| Classify | rule, fact, preference, episode, skill? | flatten into notes |
| Scope | user, repo, project, org, tool? | global memory |
| Store | which data structure? | one vector index |
| Retrieve | what enters context now? | top-k similarity |
| Validate | is it still true? | trust old state |
| Delete | where must it disappear? | delete one visible note |

Two invariants follow:

```text
memory enters context only through retrieval policy
memory changes action only after validation policy
```

If either policy is implicit, the system will eventually trust the wrong thing.

### Authority

A memory is not authoritative just because it is in context.

| Source | Authority | Treatment |
| --- | --- | --- |
| Checked-in docs/code/config | High | source of truth |
| Cited current repo fact | High-medium | use with citation/branch validation |
| Human-authored memory | Medium | instruction or hint |
| Generated memory with source | Medium-low | validate before action |
| Generated memory without source | Low | hypothesis |
| Similar retrieved memory | Hint only | use to search, not decide |

Required team behavior belongs in checked-in files: `AGENTS.md`, `CLAUDE.md`, runbooks, CI config, repo docs. Generated memory is useful recall. It is not policy.

```text
memory can suggest
source of truth decides
```

### How Systems Instantiate It

| Archetype | Always loaded | Retrieved on demand | Write path | Examples | Failure to watch |
| --- | --- | --- | --- | --- | --- |
| File-first | summary/index | files, grep, daily notes | agent writes or consolidation | Claude Code, Codex, OpenClaw | index cliff |
| Frozen prompt + search | tiny profile | transcript search | add/replace/remove, async sync | Hermes | snapshot lag |
| Managed resource | mount metadata | filesystem/API | versioned writes, API edits | Anthropic Managed Agents, AgentCore | writable memory injection |
| Product memory | user/repo profile | product recall | saved/inferred facts | ChatGPT, Gemini, Copilot, Devin | weak provenance |
| External semantic/graph | little or none | semantic search, graph traversal | API/tool writes, ingestion | Mem0, Zep, GBrain, Letta | governance sprawl |

Claude Code and Codex show the file-first pattern. `CLAUDE.md`/`AGENTS.md` are instruction memory. Auto memory or generated Codex memory lives in local Markdown. Codex spends model calls on async extraction/consolidation, then keeps reads cheap: summary first, keyword search next. This is inspectable and predictable, but paraphrases can miss. Claude's bounded `MEMORY.md` startup index gives the general failure mode: the memory exists, but the agent no longer knows how to find it.

OpenClaw makes the same operational point with `/context list` and `/context detail`: debug what actually loaded, not what exists on disk.

Hermes compresses the always-loaded layer aggressively: `MEMORY.md` is 2,200 chars, `USER.md` is 1,375 chars, both frozen at session start. Detail moves to SQLite FTS session search or one external provider. This is good for prompt stability; bad when a write persists to disk but is not visible until the next prompt boundary.

Anthropic Managed Agents is the cleanest official governed-memory example. Memory stores are mounted under `/mnt/memory/`, support read-only/read-write access, immutable versions, optimistic concurrency, redaction, 100 kB memories, 2,000 memories per store, and up to 8 stores per session. Dreams add safe consolidation:

```text
input memory store + 1..100 sessions
  -> async dream
  -> separate output memory store
  -> review / attach / archive / delete
```

The input store is not mutated. That is the safety property: consolidation produces candidate state, not silent live-state edits.

External memory systems optimize recall. Mem0 v3 uses async ADD-only extraction into scoped stores (`user_id`, `agent_id`, `app_id`, `run_id`). GBrain shows the graph-shaped version:

```text
RAG:          query -> top-k chunks -> answer
graph memory: query -> retrieve -> connect -> synthesize -> cite -> expose gaps
```

Vector search handles paraphrase. BM25 handles exact names. Graph traversal handles relationships. Source ranking handles authority. Reranking handles false positives. The output should be:

```text
claim + citation + freshness + missing information
```

External memory is powerful when recall spans tools, sessions, and large corpora. Its cost is governance: every extra store is another place stale facts, leaked scopes, and failed deletion can hide.

### The Contract

Start with the contract, not the database.

```text
propose(event) -> candidate | null
write(candidate, scope, source) -> memory_id | no_op
retrieve(task, scope) -> ranked memories
validate(memory, task) -> trusted | stale | conflict | hint
inject(memory, mode) -> prompt text with source/authority
update(memory_id, source) -> new version
delete(memory_id) -> tombstone + derived cleanup
explain(memory_id) -> source, scope, versions, retrieval path
```

`no_op` should be common. Most events should not become memory. Retrieval and injection are also different decisions: retrieval says "this might matter"; injection says "show this to the model with this authority."

A useful record is boring:

```yaml
type: rule | fact | preference | episode | skill | hypothesis
scope: user | repo | project | org | tool
source: citation_or_event_id
content: "Deployments happen from main only after pnpm build passes."
confidence: high | medium | low
last_validated_at: timestamp
expires_at: timestamp | null
access: private | shared | read_only | read_write
valid_when: "task involves deploy/release/push"
contradicts: [...]
```

Those fields answer the real questions: who can see it, whether it is current, why it exists, when to use it, and how to delete it.

### One Lifecycle

Raw event:

```text
User: "Remember, this repo deploys from main only after pnpm build passes."
```

Bad memory:

```text
User prefers pnpm build.
```

That turns a repo deployment rule into a vague user preference.

Better:

| Step | Decision | Result |
| --- | --- | --- |
| Capture | durable operational constraint | candidate |
| Extract | deploy requires `main` + `pnpm build` | normalized rule |
| Classify | repo rule, not user preference | `type: rule`, `scope: repo` |
| Store | save source/confidence/validation path | memory record |
| Retrieve | task mentions release/deploy/push | load deploy rules |
| Validate | check package scripts, CI, docs | cite or downgrade |
| Act | block unsafe deploy, run build | changed behavior |
| Update | deploy process changes | stale old rule, add new rule |
| Delete | user asks to forget | remove record + derived summaries |

The policy is narrow:

```text
if task involves deploy/release/push:
  retrieve repo deployment rules
  validate against checked-in source
  cite before acting
```

The point is not that the agent remembered the sentence. It preserved type, scope, source, validation path, and changed a future action correctly.

### Failure Modes

| Failure | Symptom | Root cause | Mitigation |
| --- | --- | --- | --- |
| Index cliff | memory exists but is never opened | capped/stale index | test lookup paths |
| Undiscoverability | search misses it | lexical mismatch, vague names, missing edge | hybrid retrieval, aliases |
| Loaded-state confusion | file exists, model did not see it | store != context | context inspection |
| Snapshot lag | write persists but not this turn | frozen prompt | expose effective time |
| Stale authority | old rule wins | no validation | source-of-truth checks |
| Poisoned memory | attack persists | untrusted write access | read-only stores, scanners, quoting |
| Scope leak | memory crosses users/orgs | weak identity model | namespaces + leakage tests |
| Delete failure | deleted fact returns | derived summaries/indexes survive | delete across stores |
| Over-consolidation | nuance disappears | summaries merge contradictions | candidate store + review |

The failures reduce to three bugs:

```text
wrong thing written
right thing not found
found thing trusted too much
```

Design reviews should force every memory feature through those cases.

### Evaluation

Bad benchmark:

```text
Did the agent remember the user's favorite color?
```

Better benchmark:

```text
Did yesterday's experience change today's decision correctly?
```

Tiny eval harness:

| Session | Test |
| --- | --- |
| S1 | Teach a repo rule with source |
| S2 | Ask unrelated task; memory should not distract |
| S3 | Ask task where rule matters; memory should change action |
| S4 | Contradict/update rule |
| S5 | Ask again; current rule should win |
| S6 | Delete rule |
| S7 | Ask again; deleted rule should not resurface |

Minimum passing bar:

```text
memory improves relevant action
memory does not distract unrelated action
updated memory beats old memory
deleted memory does not reappear
```

Score action correctness, citation validity, stale recall, deletion correctness, false positives, latency/token cost, and cross-scope leakage. MemoryArena is useful because it couples memory with action. Stompy's coding-agent benchmark is useful because it reports a modest result: memory reduced exploration on harder tasks, did not materially improve code quality, and hurt trivial tasks. Memory helps when rediscovery is expensive.

### What Should I Use?

| Need | Use | Avoid |
| --- | --- | --- |
| Team rules, commands, security constraints | checked-in docs: `AGENTS.md`, `CLAUDE.md`, runbooks | generated memory |
| User preferences | product/user memory with controls | repo memory |
| Current task continuity | compaction/session summaries | long-term memory |
| Current codebase facts | cited repo facts or regenerated docs | uncited semantic notes |
| Long-lived research context | hybrid search or graph memory | one prompt-loaded file |
| Cross-tool recall | external provider/MCP with scopes | copied local folders |
| Enterprise audit/isolation | managed memory with namespaces/versions/delete APIs | informal files |
| Relationship/time-heavy facts | temporal graph | plain chunks |

A solid default:

```text
rules in repo docs
small summary in prompt
details retrieved on demand
sources attached to claims
writes scoped by identity/project
delete path tested
```

### Checklist

Before adding memory, answer:

1. What memory types exist?
2. Which events can create memory?
3. Which writes require approval?
4. What is always injected vs retrieved on demand?
5. What is the source of authority?
6. How are stale memories detected?
7. How are contradictions represented?
8. What is the delete path?
9. What eval proves memory improves action?
10. How can the operator inspect what loaded this turn?
11. Do writes affect the current prompt or the next snapshot?
12. Are memories scanned for prompt-injection/exfiltration before becoming prompt text?

If these answers are vague, the system has retrieval, not memory architecture.

### Closing

The model is mostly stateless. The harness is becoming the runtime. Memory is the state layer of that runtime.

Retrieval is not learning, but it does not need to be learning to be useful. The real problem is state management: what persists, why it persists, who can see it, when it expires, whether it should be trusted, and how it can be forgotten.

Agents do not need "more memory" in the abstract.

They need better state.

## References

- Pasted reference: mem0 "State of Memory in Agent Harness" source pack from `/Users/axitkhurana/.codex/attachments/4a6d5524-3e80-479d-bb1e-cfc893d9f8cc/pasted-text.txt`
- [GBrain repo](https://github.com/garrytan/gbrain/)
- [GBrain `llms.txt`](https://raw.githubusercontent.com/garrytan/gbrain/master/llms.txt)
- [GBrain install guide for agents](https://raw.githubusercontent.com/garrytan/gbrain/master/INSTALL_FOR_AGENTS.md)
- [GBrain retrieval architecture](https://raw.githubusercontent.com/garrytan/gbrain/master/docs/architecture/RETRIEVAL.md)
- [GBrain deployment topologies](https://raw.githubusercontent.com/garrytan/gbrain/master/docs/architecture/topologies.md)
- [Claude Code memory docs](https://code.claude.com/docs/en/memory)
- Pasted reference: Troy Hua "How Anthropic Built 7 Layers of Memory and a Dreaming System for Claude Code" source-analysis paste from `/Users/axitkhurana/.codex/attachments/8f7071eb-329f-41c2-b6e9-a010eb8a64af/pasted-text.txt`
- [Anthropic Managed Agents memory docs](https://platform.claude.com/docs/en/managed-agents/memory)
- [Anthropic Managed Agents Dreams](https://platform.claude.com/docs/en/managed-agents/dreams)
- [Codex memories](https://developers.openai.com/codex/memories)
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- Pasted reference: mem0 "How Memory Works in Codex CLI" source-analysis/vendor paste from `/Users/axitkhurana/.codex/attachments/56395365-6fe4-4b48-a7f4-b2c580f72091/pasted-text.txt`
- [Mem0: OpenClaw Memory Management](https://mem0.ai/blog/openclaw-memory-management-live-data-compaction-and-best-practices)
- [OpenClaw memory overview](https://docs.openclaw.ai/concepts/memory)
- [OpenClaw compaction docs](https://docs.openclaw.ai/concepts/compaction)
- [OpenClaw context docs](https://docs.openclaw.ai/concepts/context)
- [OpenClaw memory config reference](https://docs.openclaw.ai/reference/memory-config)
- [Mem0 OpenClaw integration docs](https://docs.mem0.ai/integrations/openclaw)
- [Codex memories README](https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/README.md)
- [Codex memory read path prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/memories/read_path.md)
- [Codex memory prompt builder](https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/prompts.rs)
- [Codex config schema](https://github.com/openai/codex/blob/main/codex-rs/core/config.schema.json)
- [Mem0 Codex integration docs](https://docs.mem0.ai/integrations/codex)
- [Mem0 v3 add memories](https://docs.mem0.ai/api-reference/memory/add-memories)
- [Mem0 v2 to v3 migration](https://docs.mem0.ai/migration/platform-v2-to-v3)
- [Mem0 research](https://mem0.ai/research)
- [OpenAI Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)
- [OpenAI context personalization cookbook](https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization)
- [OpenAI compaction guide](https://developers.openai.com/api/docs/guides/compaction)
- [GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)
- [Gemini Apps saved info](https://support.google.com/gemini/answer/15637730)
- [AWS AgentCore FAQ](https://aws.amazon.com/bedrock/agentcore/faqs/)
- [AWS AgentCore Memory deep dive](https://aws.amazon.com/blogs/machine-learning/building-smarter-ai-agents-agentcore-long-term-memory-deep-dive/)
- [AWS AgentCore built-in memory strategies](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-configuring-built-in-strategies.html)
- [AWS AgentCore harness memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-memory.html)
- [AWS AgentCore memory organization](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory-organization.html)
- [AWS AgentCore save/retrieve insights](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-saving-and-retrieving-insights.html)
- [AWS AgentCore redrive failed ingestions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-redrive.html)
- [Devin Knowledge](https://docs.devin.ai/product-guides/knowledge)
- [Devin DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki)
- [Hermes Agent persistent memory](https://hermes-agent.ai/features/persistent-memory)
- [Vectorize: How Hermes Agent Memory Actually Works](https://vectorize.io/articles/hermes-agent-memory-explained)
- Pasted reference: mem0 "How to Add Memory to Your Hermes Agent" source/vendor paste from `/Users/axitkhurana/.codex/attachments/6b4e793a-003c-4e57-9456-4f478aca348b/pasted-text.txt`
- [Hermes persistent memory docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md)
- [Hermes memory providers docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory-providers.md)
- [Hermes skills docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md)
- [Hermes memory provider interface](https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_provider.py)
- [Hermes memory manager](https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_manager.py)
- [Mem0 Hermes integration docs](https://docs.mem0.ai/integrations/hermes)
- [GBrain evals](https://github.com/garrytan/gbrain-evals)
- [MemGPT](https://arxiv.org/abs/2310.08560)
- [Letta archival memory](https://docs.letta.com/guides/core-concepts/memory/archival-memory/)
- [Letta context hierarchy](https://docs.letta.com/guides/core-concepts/memory/context-hierarchy/)
- [LangChain Deep Agents memory](https://docs.langchain.com/oss/javascript/deepagents/memory)
- [Zep temporal knowledge graph paper](https://arxiv.org/abs/2501.13956)
- [Memory for Autonomous LLM Agents](https://arxiv.org/abs/2603.07670)
- [Contextual Agentic Memory is a Memo, Not True Memory](https://arxiv.org/abs/2604.27707)
- [MemoryArena](https://arxiv.org/abs/2602.16313)
- [Anatomy of Agentic Memory](https://arxiv.org/abs/2602.19320)
- [Stompy: Does AI Memory Actually Work for Coding Agents?](https://www.stompy.ai/pro)
