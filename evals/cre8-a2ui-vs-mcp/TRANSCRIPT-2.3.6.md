# Eval run transcript digest

63 trials across 6 arms, @tmorrow/cre8-wc 2.3.6, claude-opus-5.

Extracted from the raw stream-json transcripts Harbor wrote per trial
(`agent/claude-code.txt`, 69 MB total). Tool counts are calls actually issued.


## The thing the scores could not show

On the freecode task the MCP-only arm barely used the MCP: **2, 4 and 13 calls**
across its three trials, against 70-77 Bash calls each. Given an installed,
typed library, the agent read `node_modules` and ran the compiler instead of
asking the catalog. That is a rational choice, and it explains why baseline and
cre8-mcp score identically there - behaviourally they were close to the same
arm.

Adding the design skill changed that by an order of magnitude: **39, 54 and 53**
MCP calls per trial, dominated by `get_component` (132 calls). The skill carries
no component facts; what it carries is an instruction to ask the MCP for them,
with a routing table. Its main measurable effect is not on the output at all -
it is that the agent actually consults the catalog.

That reframes the freecode result. "The MCP adds nothing once the compiler is in
the loop" is too strong. What the run shows is that an agent with a compiler
*stops reaching for the MCP unless something tells it to*, and the arm that did
reach for it produced the six components baseline never found. Whether the
prompting is worth it is a separate question from whether the catalog is.


## baseline  (18 trials)

- mean reward **0.7773**, mean 13 assistant turns, 60 output tokens/trial
- tool calls: Glob×108, Write×18, Grep×11, ToolSearch×4, Read×1
- MCP calls: **0** total (0.0 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `FvW8qXj` | a2ui-account-dashboard | 0.8393 | 14 | Glob×6, ToolSearch×1, Write×1 |
| `gEHK5aw` | a2ui-account-dashboard | 0.8393 | 12 | Glob×6, Write×1 |
| `qRshfTr` | a2ui-account-dashboard | 0.8395 | 12 | Glob×6, Write×1 |
| `C263bw7` | a2ui-app-shell-slots | 0.8114 | 12 | Glob×6, Write×1 |
| `JroaDxy` | a2ui-app-shell-slots | 0.7943 | 15 | Glob×7, Grep×1, Write×1 |
| `xmmF2xU` | a2ui-app-shell-slots | 0.8173 | 11 | Glob×6, Write×1 |
| `2yMmGUy` | a2ui-form-error-states | 0.7857 | 19 | Glob×7, Grep×3, ToolSearch×1, Write×1 |
| `X3eUJ4i` | a2ui-form-error-states | 0.7835 | 22 | Glob×10, Grep×1, ToolSearch×1, Write×1 |
| `nJvfGAf` | a2ui-form-error-states | 0.7778 | 14 | Glob×7, Grep×1, Write×1 |
| `8NGMUM4` | a2ui-open-portfolio | 0.5956 | 11 | Glob×4, Write×1 |
| `PfEr57b` | a2ui-open-portfolio | 0.7051 | 8 | Glob×2, Write×1 |
| `dcSRy58` | a2ui-open-portfolio | 0.7397 | 8 | Glob×3, Write×1 |
| `LD6xDck` | a2ui-orders-table | 0.8448 | 14 | Glob×7, ToolSearch×1, Write×1 |
| `NivbbhS` | a2ui-orders-table | 0.8448 | 19 | Glob×7, Grep×3, Read×1, Write×1 |
| `qaEMMT7` | a2ui-orders-table | 0.8448 | 10 | Glob×4, Grep×1, Write×1 |
| `CAbZ8iA` | a2ui-status-strip-enums | 0.7141 | 13 | Glob×6, Grep×1, Write×1 |
| `GJCxYuw` | a2ui-status-strip-enums | 0.7121 | 15 | Glob×8, Write×1 |
| `UfY6PbN` | a2ui-status-strip-enums | 0.7011 | 11 | Glob×6, Write×1 |

## cre8-mcp  (18 trials)

- mean reward **0.9892**, mean 43 assistant turns, 272 output tokens/trial
- tool calls: mcp__cre8__get_a2ui_catalog×282, mcp__cre8__get_composition×47, ToolSearch×35, Glob×34, mcp__cre8__validate_a2ui_spec×27, mcp__cre8__get_patterns×21, mcp__cre8__get_content_model×19, Write×18
- MCP calls: **442** total (24.6 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `4cE8VyE` | a2ui-account-dashboard | 0.9881 | 45 | mcp__cre8__get_a2ui_catalog×15, ToolSearch×4, Glob×3, mcp__cre8__validate_a2ui_spec×3 |
| `KRrzRyL` | a2ui-account-dashboard | 0.9881 | 37 | mcp__cre8__get_a2ui_catalog×13, ToolSearch×2, Glob×2, mcp__cre8__validate_a2ui_spec×2 |
| `df7z8SH` | a2ui-account-dashboard | 0.9881 | 38 | mcp__cre8__get_a2ui_catalog×15, mcp__cre8__validate_a2ui_spec×4, Glob×3, ToolSearch×2 |
| `5qH5Fn6` | a2ui-app-shell-slots | 0.9890 | 41 | mcp__cre8__get_a2ui_catalog×15, mcp__cre8__get_composition×6, mcp__cre8__get_patterns×2, ToolSearch×1 |
| `L5x88PS` | a2ui-app-shell-slots | 0.9780 | 44 | mcp__cre8__get_a2ui_catalog×17, mcp__cre8__get_composition×6, mcp__cre8__get_component×3, ToolSearch×2 |
| `RRHoqhQ` | a2ui-app-shell-slots | 0.9890 | 44 | mcp__cre8__get_a2ui_catalog×16, mcp__cre8__get_composition×7, ToolSearch×2, Glob×2 |
| `Fnerfdj` | a2ui-form-error-states | 0.9702 | 33 | Glob×4, mcp__cre8__get_a2ui_catalog×3, mcp__cre8__get_patterns×3, ToolSearch×2 |
| `bsKXnwc` | a2ui-form-error-states | 0.9762 | 44 | mcp__cre8__get_content_model×7, mcp__cre8__get_component×5, Glob×4, mcp__cre8__get_a2ui_catalog×3 |
| `oLEVshq` | a2ui-form-error-states | 0.9711 | 31 | Glob×3, mcp__cre8__get_component×3, mcp__cre8__get_patterns×3, ToolSearch×2 |
| `JL28LEk` | a2ui-open-portfolio | 1.0000 | 92 | mcp__cre8__get_a2ui_catalog×54, mcp__cre8__get_composition×7, Grep×4, ToolSearch×2 |
| `QU9h588` | a2ui-open-portfolio | 1.0000 | 128 | mcp__cre8__get_a2ui_catalog×54, Edit×12, Grep×6, ToolSearch×3 |
| `oP23H5C` | a2ui-open-portfolio | 1.0000 | 85 | mcp__cre8__get_a2ui_catalog×52, mcp__cre8__validate_a2ui_spec×3, ToolSearch×2, mcp__cre8__get_composition×2 |
| `F6J6JLa` | a2ui-orders-table | 1.0000 | 12 | ToolSearch×1, Glob×1, mcp__cre8__get_composition×1, mcp__cre8__cre8_guide×1 |
| `VqW9Uo4` | a2ui-orders-table | 1.0000 | 18 | mcp__cre8__get_composition×2, mcp__cre8__get_a2ui_catalog×2, ToolSearch×1, Glob×1 |
| `r4Mjj46` | a2ui-orders-table | 1.0000 | 16 | ToolSearch×2, Glob×2, mcp__cre8__get_a2ui_catalog×2, mcp__cre8__validate_a2ui_spec×2 |
| `KvfjzDB` | a2ui-status-strip-enums | 0.9890 | 26 | mcp__cre8__get_a2ui_catalog×6, mcp__cre8__get_composition×4, ToolSearch×1, Glob×1 |
| `bowGT9B` | a2ui-status-strip-enums | 0.9890 | 22 | mcp__cre8__get_a2ui_catalog×6, ToolSearch×2, Glob×2, mcp__cre8__cre8_guide×1 |
| `wVUmEHs` | a2ui-status-strip-enums | 0.9890 | 26 | mcp__cre8__get_a2ui_catalog×6, ToolSearch×2, Glob×2, mcp__cre8__get_composition×2 |

## cre8-mcp-design  (18 trials)

- mean reward **0.9893**, mean 42 assistant turns, 246 output tokens/trial
- tool calls: mcp__cre8__get_component×242, mcp__cre8__get_a2ui_catalog×37, ToolSearch×36, mcp__cre8__get_content_model×35, mcp__cre8__get_patterns×27, mcp__cre8__validate_a2ui_spec×26, mcp__cre8__get_composition×26, Skill×21
- MCP calls: **446** total (24.8 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `7222NTv` | a2ui-account-dashboard | 0.9881 | 35 | mcp__cre8__get_component×13, mcp__cre8__validate_a2ui_spec×3, ToolSearch×2, Skill×1 |
| `Ags76mK` | a2ui-account-dashboard | 0.9881 | 35 | mcp__cre8__get_component×15, ToolSearch×2, mcp__cre8__validate_a2ui_spec×2, Skill×1 |
| `r8yUqMZ` | a2ui-account-dashboard | 0.9881 | 39 | mcp__cre8__get_component×17, mcp__cre8__get_patterns×3, ToolSearch×2, mcp__cre8__validate_a2ui_spec×2 |
| `tstu4iS` | a2ui-app-shell-slots | 0.9890 | 44 | mcp__cre8__get_component×13, mcp__cre8__get_content_model×4, ToolSearch×2, mcp__cre8__get_composition×2 |
| `yhQWttr` | a2ui-app-shell-slots | 0.9780 | 54 | mcp__cre8__get_component×18, ToolSearch×3, mcp__cre8__get_composition×3, mcp__cre8__list_components×2 |
| `zeqoUW6` | a2ui-app-shell-slots | 0.9890 | 39 | mcp__cre8__get_component×14, Glob×3, ToolSearch×2, mcp__cre8__get_composition×2 |
| `9wk8Ww3` | a2ui-form-error-states | 0.9762 | 40 | mcp__cre8__get_content_model×7, Glob×4, mcp__cre8__get_component×3, mcp__cre8__get_patterns×3 |
| `oHdtomB` | a2ui-form-error-states | 0.9762 | 47 | mcp__cre8__get_content_model×6, mcp__cre8__get_a2ui_catalog×4, mcp__cre8__search_components×3, mcp__cre8__get_patterns×3 |
| `ufZgGyB` | a2ui-form-error-states | 0.9762 | 33 | mcp__cre8__get_content_model×5, mcp__cre8__get_patterns×3, mcp__cre8__get_component×3, mcp__cre8__search_components×2 |
| `UFPuf5b` | a2ui-open-portfolio | 0.9963 | 82 | mcp__cre8__get_component×48, mcp__cre8__get_composition×4, Skill×2, ToolSearch×2 |
| `s2Ngxeq` | a2ui-open-portfolio | 0.9955 | 83 | mcp__cre8__get_component×42, mcp__cre8__get_a2ui_catalog×5, mcp__cre8__get_patterns×3, mcp__cre8__validate_a2ui_spec×3 |
| `yBZVQnU` | a2ui-open-portfolio | 1.0000 | 96 | mcp__cre8__get_component×42, mcp__cre8__get_a2ui_catalog×14, mcp__cre8__get_patterns×3, Glob×3 |
| `DWD3BG2` | a2ui-orders-table | 1.0000 | 31 | ToolSearch×4, Glob×3, mcp__cre8__get_composition×2, mcp__cre8__get_component×2 |
| `Q9UeaQ3` | a2ui-orders-table | 1.0000 | 13 | mcp__cre8__get_a2ui_catalog×2, ToolSearch×1, Skill×1, mcp__cre8__cre8_guide×1 |
| `kz5ty2k` | a2ui-orders-table | 1.0000 | 14 | ToolSearch×2, mcp__cre8__get_a2ui_catalog×2, Skill×1, mcp__cre8__cre8_guide×1 |
| `Y7dGYvz` | a2ui-status-strip-enums | 0.9890 | 25 | mcp__cre8__get_component×6, mcp__cre8__search_components×3, ToolSearch×2, Skill×1 |
| `Yg8Sarz` | a2ui-status-strip-enums | 0.9890 | 25 | mcp__cre8__get_component×4, mcp__cre8__search_components×3, ToolSearch×2, mcp__cre8__list_components×2 |
| `zqdB6GK` | a2ui-status-strip-enums | 0.9890 | 24 | mcp__cre8__get_a2ui_catalog×6, mcp__cre8__search_components×2, Skill×1, ToolSearch×1 |

## baseline-freecode  (3 trials)

- mean reward **1.0000**, mean 173 assistant turns, 1,246 output tokens/trial
- tool calls: Bash×233, Read×58, Edit×30, Write×3
- MCP calls: **0** total (0.0 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `8XykNoz` | mcp-freecode-portfolio | 1.0000 | 226 | Bash×97, Edit×19, Read×19, Write×1 |
| `wmKNWD7` | mcp-freecode-portfolio | 1.0000 | 148 | Bash×66, Read×23, Edit×6, Write×1 |
| `x9UGMMN` | mcp-freecode-portfolio | 1.0000 | 144 | Bash×70, Read×16, Edit×5, Write×1 |

## cre8-mcp-freecode  (3 trials)

- mean reward **0.9996**, mean 174 assistant turns, 1,131 output tokens/trial
- tool calls: Bash×218, Read×47, Edit×31, mcp__cre8__get_composition×8, ToolSearch×4, mcp__cre8__get_patterns×4, mcp__cre8__cre8_guide×3, Write×3
- MCP calls: **19** total (6.3 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `6JLCLdD` | mcp-freecode-portfolio | 1.0000 | 155 | Bash×70, Read×17, Edit×4, ToolSearch×1 |
| `YBiL3k6` | mcp-freecode-portfolio | 0.9987 | 160 | Bash×71, Read×12, Edit×11, ToolSearch×1 |
| `dMaL9Uq` | mcp-freecode-portfolio | 1.0000 | 206 | Bash×77, Read×18, Edit×16, mcp__cre8__get_composition×6 |

## cre8-mcp-design-freecode  (3 trials)

- mean reward **1.0000**, mean 230 assistant turns, 1,461 output tokens/trial
- tool calls: Bash×217, mcp__cre8__get_component×132, Read×43, Edit×39, Write×8, Skill×5, ToolSearch×5, mcp__cre8__get_patterns×5
- MCP calls: **146** total (48.7 per trial)

| trial | task | reward | turns | top tools |
|---|---|---|---|---|
| `52LnB2b` | mcp-freecode-portfolio | 1.0000 | 221 | Bash×73, mcp__cre8__get_component×36, Edit×13, Read×9 |
| `DPjb4vD` | mcp-freecode-portfolio | 1.0000 | 253 | Bash×83, mcp__cre8__get_component×48, Read×17, Edit×11 |
| `dyzotuF` | mcp-freecode-portfolio | 1.0000 | 215 | Bash×61, mcp__cre8__get_component×48, Read×17, Edit×15 |
