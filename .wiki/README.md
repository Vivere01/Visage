# 📚 Visagê — LLM Wiki

Sistema de memória persistente e auto-sincronizado para o desenvolvimento do Visagê.

## Estrutura

| Módulo | Arquivo | Descrição |
|--------|---------|-----------|
| 1 | `dominio-visagismo.md` | Conhecimento técnico de visagismo |
| 2 | `memoria-produto.md` | Stack, entidades, fluxos |
| 3 | `decisoes.md` | Log de decisões arquiteturais |
| 4 | `estilo-trabalho.md` | Preferências e regras de colaboração |
| 5 | `evolucao.md` | Resumos de sessão e evolução |

## Regras de Sincronização

1. **Nunca sobrescrever decisão confirmada** sem aprovação explícita do dono
2. **Toda decisão** deve ter: data, motivo, módulos impactados
3. **A cada sessão**: gerar resumo, sinalizar módulos desatualizados
4. **Verbetes proativos**: criar quando detectar padrão nas perguntas
