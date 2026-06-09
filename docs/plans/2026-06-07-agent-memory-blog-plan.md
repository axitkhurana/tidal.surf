# Agents Do Not Need More Memory. They Need Better State.
Created: 2026-06-07
Status: working draft

## Working Plan

### Remaining Work

- Keep the pasted mem0 survey's most specific implementation claims only when primary sources corroborate them. Current status: Hermes/OpenClaw core mechanics are source-backed; Codex core mechanics and config shape are source-backed; Devin/DeepWiki are source-backed; Mem0 v3 architecture is source-backed by Mem0 docs/paper but vendor-authored; Claude Code internals beyond official memory docs remain unverified.
- Drop the GitHub Copilot PR merge-rate A/B claim unless a primary GitHub source appears. Current searches only surfaced secondary articles repeating the claim; keep only what [GitHub's Copilot Memory docs](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) verify.
- Validate Claude Code details from the pasted source that official docs do not yet confirm: four auto-memory categories, smaller-model file selection, max five files per turn, filename-description manifest retrieval, silent dropped-file behavior, and TEAMMEM.
- From the Claude Code source-analysis paste, keep the concept of the "index cliff" as a source-backed lead: memories may exist on disk but become undiscoverable if the startup index is capped or no longer references them. Official docs confirm the `MEMORY.md` startup cap; the exact selector/max-file mechanics still need validation.
- Validate the newer Claude Code "7 layers" source-analysis paste before using its exact internals: tool-result persistence, microcompaction/cache edits, session memory, full compaction thresholds, auto-memory extraction categories, background dreaming, cross-agent messaging, and prompt-cache mechanisms. Use the conceptual stack, not the leaked/source-analysis constants, until primary sources confirm them.
- Find truly independent reproductions of Mem0/GBrain-style benchmark claims. Current critique coverage is enough for this draft, but independent reproductions would strengthen it.
- Add missing harnesses/tools if they can be source-backed: possibly more enterprise memory systems beyond Gemini/Devin/Mem0.

### Pasted Source Coverage Audit

Covered in the draft:
- Agent memory taxonomy: working/context, external memory, parametric memory; plus semantic/episodic/procedural split.
- Main thesis that harnesses increasingly own memory/state, not just the base model.
- Claude Code's two-track model: `CLAUDE.md` instructions plus auto-memory markdown folder.
- Codex as two-phase extraction/consolidation with file-based memory artifacts.
- Copilot's citation-backed repo memory and 28-day expiry.
- Anthropic Managed Agents as mounted workspace memory with immutable versions and prompt-injection risk.
- Anthropic Managed Agents Dreams as official async memory-store consolidation that writes to a separate output store, not in-place mutation.
- AWS AgentCore as typed/strategy-based managed memory.
- Hermes as tiny frozen prompt memory (`MEMORY.md`/`USER.md`), on-demand session search, and additive external memory providers.
- Windsurf memories at a high level.
- OpenClaw as primary-source-backed file memory, daily notes, hybrid recall, compaction, memory flush, and live context inspection.
- OpenClaw Mem0 plugin-specifics: eight tools, CLI commands, `topK=5`, `searchThreshold=0.3`, session/long-term scopes, query-based delete, and platform/open-source modes.
- Hermes skills as procedural memory after complex tasks/corrections/errors/discovered workflows.
- Mem0 Codex plugin details: nine MCP tools, direct MCP config, plugin-vs-MCP-only distinction, and lifecycle hooks.
- Devin Knowledge / DeepWiki as trigger-based human-authored knowledge plus auto-generated repo wiki/search.
- Gemini saved info / past-chat personalization as product-level user memory with user controls.
- Mem0 v3 as an external-memory case study, with vendor-reported metrics caveated.
- Benchmark critique: recall is not enough; MemoryArena and Anatomy of Agentic Memory are included.
- Core recurring shortcomings: local/bounded storage, weak retrieval, staleness, isolation, deletion, evals.

Partially covered:
- Claude Code retrieval mechanics: we cover `MEMORY.md` index and on-demand topic files from official docs, but not the pasted source's smaller-model selector / max-five-files claims.
- Claude Code context management: the draft now uses the "7 layers" paste as a conceptual lead for layered memory/context pressure, but does not treat its exact file paths, thresholds, flags, metrics, or "dreaming" internals as verified facts.
- Codex implementation specifics: we cover code-backed Phase 1/Phase 2, folder shape, and now the write/read-path asymmetry. We still do not treat all mem0 survey limits/latency/region claims as verified.
- GBrain: covered as an additional graph/synthesis case study, not part of the pasted mem0 source.
- Mem0: now represented as an external-memory contrast row, not yet as a detailed architecture/case study.

Missing or intentionally deferred:
- Independent reproduction of Mem0 v3 benchmark/token/latency claims.
- LoCoMo, LongMemEval, BEAM, MemoryAgentBench, stability-plasticity, selective forgetting, cross-user contamination, and memory poisoning details.
- The pasted source's exact benchmark and production metric claims, especially Copilot PR merge-rate lift and AWS/AgentCore numbers.
- The "pattern in shortcomings" could be sharpened into a dedicated failure-mode table.

### Claims Safe To Use

- Claude Code has two complementary memory systems loaded at the start of every conversation: human-authored `CLAUDE.md` instruction files and auto memory notes Claude writes itself. Both are context, not enforced configuration. Source: [Claude Code memory docs](https://code.claude.com/docs/en/memory).
- Claude Code auto memory is per repository, stored under `~/.claude/projects/<project>/memory/`, with `MEMORY.md` as the entrypoint/index plus optional topic files. The first 200 lines or first 25KB of `MEMORY.md` load at session start; topic files load on demand through normal file tools. Source: [Claude Code auto memory docs](https://code.claude.com/docs/en/memory).
- Codex memories are optional, off by default, local/generated state under `~/.codex/memories/`; required team guidance belongs in `AGENTS.md` or checked-in docs. Source: [Codex memories](https://developers.openai.com/codex/memories), [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md).
- ChatGPT memory has saved memories and reference chat history, with user controls for viewing, deleting, turning off memory, and using Temporary Chat. Source: [OpenAI Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq).
- OpenAI's developer pattern for personalization treats memory as state management: persistent state, memory injection, session notes, consolidation, pruning, deduplication, and local-first storage. Source: [OpenAI context personalization cookbook](https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization).
- Compaction is related but separate from long-term memory: it preserves task continuity across context-window boundaries. Source: [OpenAI compaction guide](https://developers.openai.com/api/docs/guides/compaction).
- Anthropic Managed Agents memory stores are workspace-scoped text-document stores mounted under `/mnt/memory/`; they support read-only/read-write access, path-addressed text memories, API/Console editing, optimistic concurrency, immutable versions, version redaction, 100 kB per memory, 2,000 memories per store, and up to 8 stores per session. Writable stores can persist prompt-injection attacks. Source: [Anthropic Managed Agents memory docs](https://platform.claude.com/docs/en/managed-agents/memory).
- Anthropic Managed Agents Dreams are official asynchronous jobs that read one existing memory store plus 1 to 100 sessions, then produce a separate output memory store for review. Dreams merge duplicates, replace stale or contradicted entries, surface new insights, and never modify the input store. Source: [Anthropic Managed Agents Dreams](https://platform.claude.com/docs/en/managed-agents/dreams).
- AWS AgentCore Memory supports built-in strategies for preferences, semantic facts, session summaries, and episodic memory. Source: [AWS AgentCore strategy docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-configuring-built-in-strategies.html).
- GitHub Copilot Memory stores repository facts and user preferences; repository facts are citation-backed and validated against the current branch before use; unused memories expire after 28 days. Source: [GitHub Copilot Memory docs](https://docs.github.com/en/copilot/concepts/agents/copilot-memory).
- Cursor Memories are project-scoped, can be generated automatically from conversations, and are managed from Cursor Settings / Rules. Source: [Cursor Memories](https://docs.cursor.com/en/context/memories).
- Windsurf separates manually defined Rules from automatically generated Cascade Memories; memories are workspace-scoped and can also be created on request. Source: [Windsurf Cascade Memories](https://docs.windsurf.com/windsurf/cascade/memories).
- Codex's open-source memory pipeline runs asynchronously at root-session startup when the memory feature is enabled, splits extraction from global consolidation, selects bounded eligible rollouts, redacts secrets, stores Phase 1 outputs in the state DB, and serializes Phase 2 consolidation into on-disk memory artifacts. Source: [Codex memories README](https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/README.md).
- Codex's Phase 1 prompt explicitly has a minimum-signal gate: if a future agent would not plausibly act better because of the memory, it should emit empty fields. Source: [Codex stage one memory prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/memories/stage_one_system.md).
- Codex's consolidation prompt exposes its on-disk memory shape: `memory_summary.md`, `MEMORY.md`, `raw_memories.md`, `skills/`, and `rollout_summaries/`. Source: [Codex consolidation prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/memories/consolidation.md).
- Codex's read path injects a truncated `memory_summary.md` into developer instructions, then instructs the agent to search `MEMORY.md` and open relevant rollout summaries or skills only when useful. Sources: [Codex read path prompt](https://github.com/openai/codex/blob/main/codex-rs/core/templates/memories/read_path.md), [Codex memory prompt builder](https://github.com/openai/codex/blob/main/codex-rs/core/src/memories/prompts.rs).
- Codex exposes memory config knobs for read/write toggles, external-context exclusion, rollout age/idle bounds, rollout startup caps, raw-memory consolidation caps, unused-memory windows, rate-limit headroom, and model overrides. Source: [Codex config schema](https://github.com/openai/codex/blob/main/codex-rs/core/config.schema.json).
- Mem0's Codex integration exposes a hosted MCP server configured through `~/.codex/config.toml`, with memory tools such as add, search, get, update, delete, entity deletion, and entity listing. Source: [Mem0 Codex integration docs](https://docs.mem0.ai/integrations/codex).
- Mem0's Codex plugin install includes MCP server registration, lifecycle hooks, and an SDK skill; direct MCP setup exposes tools only. Documented hooks include `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, and `PreCompact`. Source: [Mem0 Codex integration docs](https://docs.mem0.ai/integrations/codex).
- Mem0 v3 uses an asynchronous additive write API with single-pass ADD-only extraction, at least one entity scope (`user_id`, `agent_id`, `app_id`, or `run_id`), entity linking, and multi-signal retrieval. Sources: [Mem0 v3 add memories](https://docs.mem0.ai/api-reference/memory/add-memories), [Mem0 v2 to v3 migration](https://docs.mem0.ai/migration/platform-v2-to-v3), [Mem0 research](https://mem0.ai/research), [Mem0 paper](https://arxiv.org/abs/2504.19413).
- Hermes Agent's built-in memory has two bounded files under `~/.hermes/memories/`: `MEMORY.md` for agent notes with a 2,200-character limit and `USER.md` for user profile with a 1,375-character limit. Both are injected into the system prompt as a frozen snapshot at session start. Source: [Hermes persistent memory docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md).
- Hermes memory writes use add/replace/remove actions; there is no read action for built-in file memory because the files are injected at session start. Replacements/removals use unique substring matching. Source: [Hermes persistent memory docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md).
- Hermes session search stores CLI and messaging sessions in SQLite at `~/.hermes/state.db` with FTS5 search, giving on-demand recall separate from always-injected memory. Source: [Hermes persistent memory docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md).
- Hermes supports eight external memory provider plugins; only one external provider can be active at a time, and the built-in `MEMORY.md`/`USER.md` layer remains active alongside it. Sources: [Hermes memory providers docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory-providers.md), [Hermes memory provider interface](https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_provider.py), [Hermes memory manager](https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_manager.py).
- Hermes external providers follow a lifecycle: initialize, system prompt block, prefetch before turns, async sync after turns, optional session-end extraction, pre-compression hooks, and mirroring built-in memory writes. Source: [Hermes memory provider interface](https://github.com/NousResearch/hermes-agent/blob/main/agent/memory_provider.py).
- Hermes skills are procedural memory. The agent can create skills after complex successful tasks, documented as 5+ tool calls, when it hit errors and found a working path, when the user corrected its approach, or when it discovered a non-trivial workflow. Source: [Hermes skills docs](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md).
- Mem0's Hermes integration is a vendor-backed example of that provider lifecycle: cached prefetch before a response, background turn sync after a response, background prefetch for the next turn, three tools (`mem0_profile`, `mem0_search`, `mem0_conclude`), and a 5-failure/2-minute circuit breaker. Source: [Mem0 Hermes integration docs](https://docs.mem0.ai/integrations/hermes).
- OpenClaw stores agent memory as plain Markdown in the agent workspace: `MEMORY.md` for durable long-term memory, `memory/YYYY-MM-DD.md` daily notes for working context, and optional `DREAMS.md`; it also distinguishes memory from enforcement. Source: [OpenClaw memory overview](https://docs.openclaw.ai/concepts/memory).
- OpenClaw exposes `memory_search` and `memory_get`; with embeddings configured, memory search uses hybrid retrieval combining vector similarity with keyword matching. Source: [OpenClaw memory overview](https://docs.openclaw.ai/concepts/memory).
- OpenClaw compaction summarizes older turns into a compact entry, saves the summary in the session transcript, keeps recent messages intact, and only changes what the model sees next; full history stays on disk. Source: [OpenClaw compaction docs](https://docs.openclaw.ai/concepts/compaction).
- Before compaction, OpenClaw runs a memory-flush turn that reminds the agent to save important notes to memory files; OpenClaw also distinguishes compaction from pruning, where pruning trims old tool results without saving them. Source: [OpenClaw compaction docs](https://docs.openclaw.ai/concepts/compaction).
- OpenClaw context docs define context as everything sent to the model for a run, distinguish it from disk memory, and expose `/context list`, `/context detail`, `/context map`, and `/status` for inspecting live prompt contributors. They also document default bootstrap caps of 20,000 characters per file and 60,000 characters total across injected workspace files. Source: [OpenClaw context docs](https://docs.openclaw.ai/concepts/context).
- Mem0's OpenClaw plugin exposes eight memory tools (`memory_search`, `memory_add`, `memory_get`, `memory_list`, `memory_update`, `memory_delete`, `memory_event_list`, `memory_event_status`), separates session and long-term scopes, defaults `topK` to 5 and `searchThreshold` to 0.3, supports query-based delete, and offers platform/cloud and open-source modes. Source: [Mem0 OpenClaw integration docs](https://docs.mem0.ai/integrations/openclaw).
- Devin Knowledge is a set of tips, advice, and instructions Devin can recall across sessions. Knowledge items require trigger descriptions, can be disabled per user, can be organized into folders, can be scoped at organization/enterprise levels, and can be pinned to no repo, a specific repo, or all repos. Source: [Devin Knowledge docs](https://docs.devin.ai/product-guides/knowledge).
- Devin DeepWiki automatically indexes repositories and generates wikis with architecture diagrams, documentation, source links, and codebase summaries. `.devin/wiki.json` can steer generation with repo notes and explicit pages, especially for large repos where automatic generation may miss components. Source: [Devin DeepWiki docs](https://docs.devin.ai/work-with-devin/deepwiki).
- AWS AgentCore Memory separates short-term raw events from long-term strategy-extracted memories, scopes data by actor/session/namespace, supports built-in long-term strategies, and provides failed-extraction redrive APIs/metrics. Sources: [AgentCore harness memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-memory.html), [AgentCore memory organization](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory-organization.html), [AgentCore save/retrieve insights](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-saving-and-retrieving-insights.html), [AgentCore redrive failed ingestions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/long-term-redrive.html).
- Gemini Apps support saved info/preferences and referencing past chats for personalization, with user controls to view, edit, delete, and turn off saved info/past-chat reference. Source: [Gemini Apps saved info docs](https://support.google.com/gemini/answer/15637730).
- GBrain's retrieval code implements hybrid retrieval with RRF, boosts, dedupe, reranking, alias handling, query expansion, and relational/graph stages; the code also has explicit source-isolation and failure-mode comments. Sources: [GBrain hybrid search](https://github.com/garrytan/gbrain/blob/master/src/core/search/hybrid.ts), [GBrain SQL ranking](https://github.com/garrytan/gbrain/blob/master/src/core/search/sql-ranking.ts).
- GBrain's operation layer is contract-first: shared operation definitions feed CLI/MCP/tool surfaces, and `OperationContext.remote` distinguishes trusted local callers from untrusted agent-facing callers. Source: [GBrain operations](https://github.com/garrytan/gbrain/blob/master/src/core/operations.ts).
- GBrain evals are public and reproducible, with committed corpora, sealed answer keys, LongMemEval/BrainBench/PrecisionMembench runners, and scorecards that report both good and weak numbers. Source: [GBrain evals](https://github.com/garrytan/gbrain-evals).
- Letta/MemGPT gives the clearest OS-style architecture for tiered memory and virtual context management. Sources: [MemGPT](https://arxiv.org/abs/2310.08560), [Letta archival memory](https://docs.letta.com/guides/core-concepts/memory/archival-memory/), [Letta context hierarchy](https://docs.letta.com/guides/core-concepts/memory/context-hierarchy/).
- LangChain's Deep Agents docs provide a useful memory taxonomy: short-term vs long-term; episodic, procedural, semantic; user/agent/org scope; prompt-loaded vs tool-retrieved. Source: [LangChain Deep Agents memory docs](https://docs.langchain.com/oss/javascript/deepagents/memory).
- Zep frames enterprise memory as temporal knowledge graph work, not static RAG. Source: [Zep paper](https://arxiv.org/abs/2501.13956).
- MemoryArena supports the claim that memory benchmarks need to test memory-guided action, not only recall. Source: [MemoryArena](https://arxiv.org/abs/2602.16313).
- The broader research literature frames memory as a write-manage-read loop with hard problems around contradiction handling, latency, privacy, and learned forgetting. Source: [Memory for Autonomous LLM Agents](https://arxiv.org/abs/2603.07670).

### Draft Artifacts

- Standalone draft with references: [2026-06-08-agent-memory-blog-draft.md](2026-06-08-agent-memory-blog-draft.md)
- Critical analysis: [2026-06-08-agent-memory-blog-critique.md](2026-06-08-agent-memory-blog-critique.md)

---

## Change Log

- **2026-06-07:** Converted from plan artifact into working draft with TODOs, validation notes, linked references, and first-pass essay prose.
- **2026-06-07:** Rewrote the draft toward a concise first-principles technical explainer style: shorter paragraphs, explicit definitions, simple state diagrams, and less survey prose.
- **2026-06-08:** Added the canonical memory model, algorithmic pipeline, data-structure section, archetype comparison, worked examples, stronger eval mechanics, and builder checklist.
- **2026-06-08:** Reworked the critical gaps: replaced shallow product tables with a cross-system matrix, reframed GBrain as a caveated case study, tied research sources to named concepts, and cut repeated thesis lines.
- **2026-06-08:** Integrated code-backed findings into the existing draft: Codex now grounds the algorithmic pipeline, and GBrain code details now strengthen the case study rather than sitting in a standalone section.
- **2026-06-08:** Corrected Claude Code coverage: `CLAUDE.md` instruction memory and repository-scoped auto memory are now represented as separate mechanisms, including `MEMORY.md` startup limits and on-demand topic files.
- **2026-06-08:** Incorporated the Claude Code source-analysis paste as the "index cliff" / undiscoverability failure mode, while keeping unverified selector and TEAMMEM details in Remaining Work.
- **2026-06-08:** Incorporated the newer Claude Code "7 layers" paste as a caveated memory-stack concept: context pressure, session continuity, durable auto memory, and background consolidation are now separated in the draft.
- **2026-06-08:** Incorporated the mem0 Codex CLI paste as a Codex write/read-path asymmetry: model-heavy async consolidation on write, cheap prompt-guided file search on read; added Mem0 MCP as an external-memory contrast while keeping vendor claims caveated.
- **2026-06-08:** Added OpenClaw as a primary-source-backed system row and used it to sharpen live context inspection, action-sensitive memories, and the compaction-vs-memory boundary.
- **2026-06-08:** Added Hermes as a primary-source-backed design contrast: tiny frozen prompt memory, SQLite session search, one external provider at a time, provider lifecycle hooks, and Mem0 prefetch/sync behavior.
- **2026-06-08:** Ran a remaining-work validation pass: dropped unverified Copilot/AWS metric claims, added Devin/Gemini/Mem0 v3/GBrain eval source-backed coverage, added a practical decision table, and tightened the retrieval-vs-learning conclusion.
- **2026-06-08:** Split the essay from the planning artifact into a standalone draft/reference doc and added a separate critical analysis doc.
- **2026-06-08:** Rewrote the standalone draft from the critique: compressed the main essay, centered the memory pipeline, added authority/archetype/failure/eval tables, and expanded one full lifecycle example.
- **2026-06-08:** Ran a second density pass: added retrieval/validation invariants, a minimal memory contract, sharper archetype tradeoffs, and concrete failure/eval acceptance criteria.
- **2026-06-08:** Compressed the standalone draft again into a tighter narrative while preserving the full mechanism set: definitions, pipeline, authority, archetypes, contract, lifecycle, failure modes, eval harness, decision table, and references.
- **2026-06-09:** Added a standalone HTML version at `public/agent-memory.html`: compact editorial layout, mechanism-first sections, pipeline visual, interactive memory-contract tabs, and linked references.
- **2026-06-09:** Expanded the HTML version from compressed companion into a fuller draft capture: added system-specific mechanisms, full lifecycle example, root-cause failure table, evaluation scoring, checklist, and complete external bibliography.
