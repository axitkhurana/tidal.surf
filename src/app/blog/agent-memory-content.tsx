const systemRows = [
  ["Claude Code", "file-first instructions + auto memory", "CLAUDE.md is human-authored instruction memory. Auto memory uses repository-scoped Markdown with MEMORY.md as the startup index and topic files loaded on demand.", "Index cliff: memory exists on disk but becomes undiscoverable."],
  ["Codex", "file-first generated memory", "Writes are model-heavy and async: extraction first, consolidation later. Reads are cheap: inject a bounded summary, then search MEMORY.md, rollout summaries, and skills only when useful.", "Write/read asymmetry can hide stale paraphrases."],
  ["OpenClaw", "workspace Markdown + live context inspection", "Durable MEMORY.md, daily notes, optional DREAMS.md, hybrid memory_search, compaction, memory flush before compaction, and /context list/detail for live prompt inspection.", "Confusing disk memory with live prompt context."],
  ["Hermes", "tiny frozen prompt + search", "MEMORY.md is limited to 2,200 characters; USER.md to 1,375. Both are frozen at session start. Detail moves to SQLite FTS session search or one active external provider.", "Snapshot lag after writes."],
  ["Anthropic Managed Agents", "mounted governed resource", "Memory stores mount under /mnt/memory/, support read-only/read-write access, optimistic concurrency, immutable versions, redaction, 100 kB memories, 2,000 memories per store, and up to 8 stores per session.", "Writable memory can persist prompt injection."],
  ["Anthropic Dreams", "async consolidation job", "Dreams read one memory store plus 1 to 100 sessions, then produce a separate output memory store for review, attach, archive, or delete. The input store is not silently mutated.", "Unsafe consolidation if candidate state becomes live without review."],
  ["Mem0 v3", "external scoped semantic memory", "Async ADD-only extraction writes to scoped stores such as user_id, agent_id, app_id, or run_id. Entity linking and multi-signal retrieval move recall outside the harness.", "Governance sprawl across stores and identities."],
  ["GBrain", "hybrid graph retrieval", "Combines vector search for paraphrase, BM25 for exact names, graph traversal for relationships, source ranking for authority, and reranking for false positives.", "Graph edges can amplify stale or weakly sourced claims."],
  ["Copilot / Devin / Gemini", "product memory", "Product-mediated user or repo profile state: repository facts, saved preferences, knowledge items, generated wiki/search, and controls around viewing or disabling remembered data.", "Weak provenance unless citations, expiry, and user controls are explicit."],
  ["AgentCore / Letta / Zep", "managed or OS-style memory", "These systems make the state layer explicit: namespaces, long-term strategies, tiered memory, archival recall, and temporal graph structure.", "More structure means more deletion, privacy, and audit surfaces."],
];

const references = [
  ["GBrain repo", "https://github.com/garrytan/gbrain/"],
  ["GBrain llms.txt", "https://raw.githubusercontent.com/garrytan/gbrain/master/llms.txt"],
  ["GBrain install guide for agents", "https://raw.githubusercontent.com/garrytan/gbrain/master/INSTALL_FOR_AGENTS.md"],
  ["GBrain retrieval architecture", "https://raw.githubusercontent.com/garrytan/gbrain/master/docs/architecture/RETRIEVAL.md"],
  ["GBrain deployment topologies", "https://raw.githubusercontent.com/garrytan/gbrain/master/docs/architecture/topologies.md"],
  ["Claude Code memory docs", "https://code.claude.com/docs/en/memory"],
  ["Anthropic Managed Agents memory docs", "https://platform.claude.com/docs/en/managed-agents/memory"],
  ["Anthropic Managed Agents Dreams", "https://platform.claude.com/docs/en/managed-agents/dreams"],
  ["Codex memories", "https://developers.openai.com/codex/memories"],
  ["Codex AGENTS.md", "https://developers.openai.com/codex/guides/agents-md"],
  ["Codex memories README", "https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/README.md"],
  ["Codex memory read path prompt", "https://github.com/openai/codex/blob/main/codex-rs/core/templates/memories/read_path.md"],
  ["Codex memory prompt builder", "https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/prompts.rs"],
  ["Codex config schema", "https://github.com/openai/codex/blob/main/codex-rs/core/config.schema.json"],
  ["Mem0: OpenClaw Memory Management", "https://mem0.ai/blog/openclaw-memory-management-live-data-compaction-and-best-practices"],
  ["OpenClaw memory overview", "https://docs.openclaw.ai/concepts/memory"],
  ["OpenClaw compaction docs", "https://docs.openclaw.ai/concepts/compaction"],
  ["OpenClaw context docs", "https://docs.openclaw.ai/concepts/context"],
  ["OpenClaw memory config reference", "https://docs.openclaw.ai/reference/memory-config"],
  ["Mem0 OpenClaw integration docs", "https://docs.mem0.ai/integrations/openclaw"],
  ["Mem0 Codex integration docs", "https://docs.mem0.ai/integrations/codex"],
  ["Mem0 v3 add memories", "https://docs.mem0.ai/api-reference/memory/add-memories"],
  ["Mem0 v2 to v3 migration", "https://docs.mem0.ai/migration/platform-v2-to-v3"],
  ["Mem0 research", "https://mem0.ai/research"],
  ["OpenAI Memory FAQ", "https://help.openai.com/en/articles/8590148-memory-faq"],
  ["OpenAI context personalization cookbook", "https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization"],
  ["OpenAI compaction guide", "https://developers.openai.com/api/docs/guides/compaction"],
  ["GitHub Copilot Memory", "https://docs.github.com/en/copilot/concepts/agents/copilot-memory"],
  ["Gemini Apps saved info", "https://support.google.com/gemini/answer/15637730"],
  ["AWS AgentCore FAQ", "https://aws.amazon.com/bedrock/agentcore/faqs/"],
  ["AWS AgentCore Memory deep dive", "https://aws.amazon.com/blogs/machine-learning/building-smarter-ai-agents-agentcore-long-term-memory-deep-dive/"],
  ["AWS AgentCore built-in memory strategies", "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-configuring-built-in-strategies.html"],
  ["AWS AgentCore harness memory", "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-memory.html"],
  ["AWS AgentCore memory organization", "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory-organization.html"],
  ["AWS AgentCore save/retrieve insights", "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-saving-and-retrieving-insights.html"],
  ["AWS AgentCore redrive failed ingestions", "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-redrive.html"],
  ["Devin Knowledge", "https://docs.devin.ai/product-guides/knowledge"],
  ["Devin DeepWiki", "https://docs.devin.ai/work-with-devin/deepwiki"],
  ["Hermes Agent persistent memory", "https://hermes-agent.ai/features/persistent-memory"],
  ["Vectorize: How Hermes Agent Memory Actually Works", "https://vectorize.io/articles/hermes-agent-memory-explained"],
  ["Hermes memory docs", "https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md"],
  ["Hermes memory providers docs", "https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory-providers.md"],
  ["Hermes skills docs", "https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md"],
  ["Hermes memory provider interface", "https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_provider.py"],
  ["Hermes memory manager", "https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_manager.py"],
  ["Mem0 Hermes integration docs", "https://docs.mem0.ai/integrations/hermes"],
  ["GBrain evals", "https://github.com/garrytan/gbrain-evals"],
  ["MemGPT", "https://arxiv.org/abs/2310.08560"],
  ["Letta archival memory", "https://docs.letta.com/guides/core-concepts/memory/archival-memory/"],
  ["Letta context hierarchy", "https://docs.letta.com/guides/core-concepts/memory/context-hierarchy/"],
  ["LangChain Deep Agents memory", "https://docs.langchain.com/oss/javascript/deepagents/memory"],
  ["Zep temporal knowledge graph paper", "https://arxiv.org/abs/2501.13956"],
  ["Memory for Autonomous LLM Agents", "https://arxiv.org/abs/2603.07670"],
  ["Contextual Agentic Memory is a Memo, Not True Memory", "https://arxiv.org/abs/2604.27707"],
  ["MemoryArena", "https://arxiv.org/abs/2602.16313"],
  ["Anatomy of Agentic Memory", "https://arxiv.org/abs/2602.19320"],
  ["Stompy coding-agent memory benchmark", "https://www.stompy.ai/pro"],
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-neutral-900 px-4 py-4 text-sm leading-relaxed text-cyan-50">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={title.toLowerCase().replaceAll(" ", "-")} className="border-t border-neutral-300/70 py-10">
      <div className="mb-5 flex items-baseline gap-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{eyebrow}</p>
        <h2 className="font-serif text-3xl font-normal leading-tight text-neutral-900">{title}</h2>
      </div>
      <div className="space-y-5 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-neutral-300/70 bg-white/55">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-cyan-50/80 text-xs uppercase tracking-[0.12em] text-neutral-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-neutral-300/70 px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-neutral-200/80 last:border-b-0">
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="min-w-44 px-4 py-3 align-top text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AgentMemoryContent() {
  return (
    <article>
      <header className="mb-12 border-b border-neutral-300/70 pb-10">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Field note / agent state
        </p>
        <h1 className="font-serif text-4xl font-normal leading-tight text-neutral-900 sm:text-6xl">
          Agents Do Not Need More Memory. They Need Better State.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          The useful question is not whether an agent has memory. It is what state crosses the boundary between two runs, and why the next run should trust it.
        </p>
        <CodeBlock>{`agent memory =
  write policy
+ store
+ retrieval policy
+ validation loop`}</CodeBlock>
      </header>

      <div className="space-y-2">
        <Section eyebrow="01" title="Split The Word">
          <p>Most memory discussions mix context, compaction, durable memory, and learning. They are different mechanisms with different failure modes.</p>
          <DataTable
            headers={["Mechanism", "What it means", "Examples", "Common failure"]}
            rows={[
              ["Context", "What the model sees now", "prompt, files, tool output", "too large or stale"],
              ["Compaction", "What survives context pressure", "session summaries", "lost intent"],
              ["Durable memory", "External state reused later", "preferences, repo rules, skills", "stale authority"],
              ["Learning", "Changed model or policy", "weights, fine-tuning", "usually not present"],
            ]}
          />
          <CodeBlock>{`context pressure    = keep this run alive
session continuity  = keep this task coherent
durable memory      = change what a future run can know`}</CodeBlock>
          <p>Do not use long-term memory to solve context overflow. Use compaction for that. Durable memory starts when the harness decides state should cross a session boundary.</p>
        </Section>

        <Section eyebrow="02" title="The Pipeline">
          <p>A memory system is good only when a future action changes correctly, with source, scope, and deletion still intact. Each edge is policy.</p>
          <CodeBlock>{`event -> capture -> extract -> classify -> scope -> store
store -> retrieve -> inject/cite -> act -> validate -> merge/prune/delete -> store`}</CodeBlock>
          <DataTable
            headers={["Stage", "Decision", "Bad default"]}
            rows={[
              ["Capture", "What is a candidate?", "save everything"],
              ["Extract", "What stable signal exists?", "summarize vaguely"],
              ["Classify", "rule, fact, preference, episode, skill?", "flatten into notes"],
              ["Scope", "user, repo, project, org, tool?", "global memory"],
              ["Store", "which data structure?", "one vector index"],
              ["Retrieve", "what enters context now?", "top-k similarity"],
              ["Validate", "is it still true?", "trust old state"],
              ["Delete", "where must it disappear?", "delete one visible note"],
            ]}
          />
          <CodeBlock>{`memory enters context only through retrieval policy
memory changes action only after validation policy`}</CodeBlock>
        </Section>

        <Section eyebrow="03" title="Authority">
          <p>A memory is not authoritative just because it is in context. Required team behavior belongs in checked-in files: AGENTS.md, CLAUDE.md, runbooks, CI config, repo docs. Generated memory is useful recall. It is not policy.</p>
          <DataTable
            headers={["Source", "Authority", "Treatment"]}
            rows={[
              ["Checked-in docs/code/config", "High", "source of truth"],
              ["Cited current repo fact", "High-medium", "use with citation/branch validation"],
              ["Human-authored memory", "Medium", "instruction or hint"],
              ["Generated memory with source", "Medium-low", "validate before action"],
              ["Generated memory without source", "Low", "hypothesis"],
              ["Similar retrieved memory", "Hint only", "use to search, not decide"],
            ]}
          />
          <CodeBlock>{`memory can suggest
source of truth decides`}</CodeBlock>
        </Section>

        <Section eyebrow="04" title="System Archetypes">
          <DataTable
            headers={["Archetype", "Always loaded", "Retrieved on demand", "Write path", "Examples", "Failure"]}
            rows={[
              ["File-first", "summary/index", "files, grep, daily notes", "agent writes or consolidation", "Claude Code, Codex, OpenClaw", "index cliff"],
              ["Frozen prompt + search", "tiny profile", "transcript search", "add/replace/remove, async sync", "Hermes", "snapshot lag"],
              ["Managed resource", "mount metadata", "filesystem/API", "versioned writes, API edits", "Anthropic Managed Agents, AgentCore", "writable memory injection"],
              ["Product memory", "user/repo profile", "product recall", "saved/inferred facts", "ChatGPT, Gemini, Copilot, Devin", "weak provenance"],
              ["External semantic/graph", "little or none", "semantic search, graph traversal", "API/tool writes, ingestion", "Mem0, Zep, GBrain, Letta", "governance sprawl"],
            ]}
          />
          <CodeBlock>{`RAG:          query -> top-k chunks -> answer
graph memory: query -> retrieve -> connect -> synthesize -> cite -> expose gaps

external memory output = claim + citation + freshness + missing information`}</CodeBlock>
        </Section>

        <Section eyebrow="05" title="System Details">
          <DataTable headers={["System", "Mechanism", "Detail", "Risk"]} rows={systemRows} />
          <CodeBlock>{`Anthropic Dreams safety shape:
input memory store + 1..100 sessions
  -> async dream
  -> separate output memory store
  -> review / attach / archive / delete

The input store is not mutated. Consolidation produces candidate state, not silent live-state edits.`}</CodeBlock>
        </Section>

        <Section eyebrow="06" title="The Contract">
          <p>Start with the contract, not the database. no_op should be common. Most events should not become memory. Retrieval and injection are also different decisions: retrieval says &quot;this might matter&quot;; injection says &quot;show this to the model with this authority.&quot;</p>
          <CodeBlock>{`propose(event) -> candidate | null
write(candidate, scope, source) -> memory_id | no_op
retrieve(task, scope) -> ranked memories
validate(memory, task) -> trusted | stale | conflict | hint
inject(memory, mode) -> prompt text with source/authority
update(memory_id, source) -> new version
delete(memory_id) -> tombstone + derived cleanup
explain(memory_id) -> source, scope, versions, retrieval path`}</CodeBlock>
          <CodeBlock>{`type: rule | fact | preference | episode | skill | hypothesis
scope: user | repo | project | org | tool
source: citation_or_event_id
content: "Deployments happen from main only after pnpm build passes."
confidence: high | medium | low
last_validated_at: timestamp
expires_at: timestamp | null
access: private | shared | read_only | read_write
valid_when: "task involves deploy/release/push"
contradicts: [...]`}</CodeBlock>
        </Section>

        <Section eyebrow="07" title="One Lifecycle">
          <p>Raw event: &quot;Remember, this repo deploys from main only after pnpm build passes.&quot; Bad memory: &quot;User prefers pnpm build.&quot; That turns a repo deployment rule into a vague user preference.</p>
          <DataTable
            headers={["Step", "Decision", "Result"]}
            rows={[
              ["Capture", "durable operational constraint", "candidate"],
              ["Extract", "deploy requires main + pnpm build", "normalized rule"],
              ["Classify", "repo rule, not user preference", "type: rule, scope: repo"],
              ["Store", "save source/confidence/validation path", "memory record"],
              ["Retrieve", "task mentions release/deploy/push", "load deploy rules"],
              ["Validate", "check package scripts, CI, docs", "cite or downgrade"],
              ["Act", "block unsafe deploy, run build", "changed behavior"],
              ["Update", "deploy process changes", "stale old rule, add new rule"],
              ["Delete", "user asks to forget", "remove record + derived summaries"],
            ]}
          />
          <CodeBlock>{`if task involves deploy/release/push:
  retrieve repo deployment rules
  validate against checked-in source
  cite before acting`}</CodeBlock>
          <p>The point is not that the agent remembered the sentence. It preserved type, scope, source, validation path, and changed a future action correctly.</p>
        </Section>

        <Section eyebrow="08" title="Failure Modes">
          <DataTable
            headers={["Failure", "Symptom", "Root cause", "Mitigation"]}
            rows={[
              ["Index cliff", "memory exists but is never opened", "capped/stale index", "test lookup paths"],
              ["Undiscoverability", "search misses it", "lexical mismatch, vague names, missing edge", "hybrid retrieval, aliases"],
              ["Loaded-state confusion", "file exists, model did not see it", "store is confused with context", "context inspection"],
              ["Snapshot lag", "write persists but not this turn", "frozen prompt", "expose effective time"],
              ["Stale authority", "old rule wins", "no validation", "source-of-truth checks"],
              ["Poisoned memory", "attack persists", "untrusted write access", "read-only stores, scanners, quoting"],
              ["Scope leak", "memory crosses users/orgs", "weak identity model", "namespaces + leakage tests"],
              ["Delete failure", "deleted fact returns", "derived summaries/indexes survive", "delete across stores"],
              ["Over-consolidation", "nuance disappears", "summaries merge contradictions", "candidate store + review"],
            ]}
          />
          <CodeBlock>{`wrong thing written
right thing not found
found thing trusted too much`}</CodeBlock>
        </Section>

        <Section eyebrow="09" title="Evaluation">
          <p>Bad benchmark: did the agent remember the user&apos;s favorite color? Better benchmark: did yesterday&apos;s experience change today&apos;s decision correctly?</p>
          <DataTable
            headers={["Session", "Test"]}
            rows={[
              ["S1", "Teach a repo rule with source"],
              ["S2", "Ask unrelated task; memory should not distract"],
              ["S3", "Ask task where rule matters; memory should change action"],
              ["S4", "Contradict/update rule"],
              ["S5", "Ask again; current rule should win"],
              ["S6", "Delete rule"],
              ["S7", "Ask again; deleted rule should not resurface"],
            ]}
          />
          <CodeBlock>{`minimum passing bar:
memory improves relevant action
memory does not distract unrelated action
updated memory beats old memory
deleted memory does not reappear

score:
action correctness
citation validity
stale recall resistance
deletion correctness
false-positive rate
latency/token cost
cross-scope leakage tests`}</CodeBlock>
          <p>MemoryArena is useful because it couples memory with action. Stompy&apos;s coding-agent benchmark is useful because it reports a modest result: memory reduced exploration on harder tasks, did not materially improve code quality, and hurt trivial tasks. Memory helps when rediscovery is expensive.</p>
        </Section>

        <Section eyebrow="10" title="What Should I Use">
          <DataTable
            headers={["Need", "Use", "Avoid"]}
            rows={[
              ["Team rules, commands, security constraints", "checked-in docs: AGENTS.md, CLAUDE.md, runbooks", "generated memory"],
              ["User preferences", "product/user memory with controls", "repo memory"],
              ["Current task continuity", "compaction/session summaries", "long-term memory"],
              ["Current codebase facts", "cited repo facts or regenerated docs", "uncited semantic notes"],
              ["Long-lived research context", "hybrid search or graph memory", "one prompt-loaded file"],
              ["Cross-tool recall", "external provider/MCP with scopes", "copied local folders"],
              ["Enterprise audit/isolation", "managed memory with namespaces/versions/delete APIs", "informal files"],
              ["Relationship/time-heavy facts", "temporal graph", "plain chunks"],
            ]}
          />
          <CodeBlock>{`rules in repo docs
small summary in prompt
details retrieved on demand
sources attached to claims
writes scoped by identity/project
delete path tested`}</CodeBlock>
        </Section>

        <Section eyebrow="11" title="Checklist">
          <ol className="grid gap-3 pl-5 text-neutral-700 sm:grid-cols-2">
            {[
              "What memory types exist?",
              "Which events can create memory?",
              "Which writes require approval?",
              "What is always injected vs retrieved on demand?",
              "What is the source of authority?",
              "How are stale memories detected?",
              "How are contradictions represented?",
              "What is the delete path?",
              "What eval proves memory improves action?",
              "How can the operator inspect what loaded this turn?",
              "Do writes affect the current prompt or the next snapshot?",
              "Are memories scanned for prompt-injection/exfiltration before becoming prompt text?",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>If these answers are vague, the system has retrieval, not memory architecture.</p>
        </Section>

        <Section eyebrow="12" title="References">
          <p>Local pasted research notes were used during drafting: mem0 State of Memory in Agent Harness; Troy Hua Claude Code memory-source analysis; mem0 Codex CLI memory-source analysis; mem0 Hermes memory source/vendor notes.</p>
          <ol className="columns-1 gap-8 space-y-2 text-sm text-neutral-600 sm:columns-2">
            {references.map(([label, href]) => (
              <li key={href} className="break-inside-avoid">
                <a href={href} className="break-words text-cyan-700 underline-offset-4 transition-colors hover:text-cyan-900">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </article>
  );
}
import type { ReactNode } from "react";
