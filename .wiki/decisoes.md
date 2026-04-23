# Módulo 3 · Auto-Sync de Decisões

> Última atualização: 2026-04-23
> Status: ✅ Ativo

---

## Regras

1. Toda decisão confirmada pelo dono é registrada aqui com: data, motivo, módulos impactados
2. Decisões **NUNCA** são sobrescritas sem confirmação explícita
3. Decisões propagam atualizações nos módulos dependentes
4. Status: `✅ Confirmada` | `⏳ Pendente` | `🔄 Revisando` | `❌ Revogada`

---

## Log de Decisões

### DEC-001 · Produto é SaaS B2B — barbeiro paga, cliente usa via link
- **Data**: 2026-04-23
- **Motivo**: Barbeiro é quem monetiza. Cliente final não paga nada.
- **Impacto**: Auth, pricing, permissões, UX
- **Status**: ✅ Confirmada

### DEC-002 · Mobile-first obrigatório (PWA)
- **Data**: 2026-04-23
- **Motivo**: Barbeiro usa com uma mão durante atendimento. Cliente interage pelo celular.
- **Impacto**: Todo o frontend, decisões de UI, performance budget
- **Status**: ✅ Confirmada

### DEC-003 · Foco em velocidade de entrega (MVP)
- **Data**: 2026-04-23
- **Motivo**: Validar com barbeiros reais o mais rápido possível
- **Impacto**: Features podem ser semi-manuais, mockups simplificados no v1
- **Status**: ✅ Confirmada

### DEC-004 · Linguagem do projeto: Português BR
- **Data**: 2026-04-23
- **Motivo**: Preferência do dono. Comunicação direta e sem enrolação.
- **Impacto**: Toda comunicação, documentação, UI copy
- **Status**: ✅ Confirmada

### DEC-005 · Fluxo de dados antes de UI
- **Data**: 2026-04-23
- **Motivo**: Estilo de trabalho do dono. Schema do banco → endpoints → UI.
- **Impacto**: Ordem de desenvolvimento
- **Status**: ✅ Confirmada
