# Módulo 2 · Memória do Produto

> Última atualização: 2026-04-23
> Status: ✅ Ativo

---

## 1. Stack Técnica

| Camada | Tecnologia | Status |
|--------|-----------|--------|
| Frontend | Next.js 15 (App Router) | 🔜 Planejado |
| UI | Vanilla CSS + Framer Motion | 🔜 Planejado |
| PWA | next-pwa + Service Worker | 🔜 Planejado |
| Backend | Next.js API Routes + Server Actions | 🔜 Planejado |
| Banco | PostgreSQL (Supabase) | 🔜 Planejado |
| ORM | Prisma | 🔜 Planejado |
| Auth | Supabase Auth (magic link + email) | 🔜 Planejado |
| Storage | Supabase Storage (fotos) | 🔜 Planejado |
| IA - Análise Facial | MediaPipe Face Mesh (client-side) | 🔜 Planejado |
| IA - Recomendações | GPT-4o-mini via API | 🔜 Planejado |
| IA - Mockups | Canvas overlay (v1) → IA generativa (v2+) | 🔜 Planejado |
| PDF | @react-pdf/renderer | 🔜 Planejado |
| Deploy | Vercel | 🔜 Planejado |
| Monitoramento | Vercel Analytics + Sentry | 🔜 Planejado |

---

## 2. Entidades Principais

### Barbeiro (Barber)
```
id            UUID PK
name          String
email         String UNIQUE
phone         String
shopName      String
slug          String UNIQUE  // para URL pública
plan          Enum (FREE, PRO, PREMIUM)
avatarUrl     String?
createdAt     DateTime
updatedAt     DateTime
```

### Cliente (Client)
```
id            UUID PK
barberId      UUID FK → Barber
name          String
phone         String?
email         String?
photoUrl      String?        // foto principal
createdAt     DateTime
updatedAt     DateTime
```

### Sessão de Análise (Session)
```
id            UUID PK
barberId      UUID FK → Barber
clientId      UUID FK → Client
status        Enum (PHOTO_PENDING, ANALYZING, MOCKUP, DOSSIER_READY, DELIVERED)
createdAt     DateTime
updatedAt     DateTime
completedAt   DateTime?
```

### Análise Facial (FaceAnalysis)
```
id            UUID PK
sessionId     UUID FK → Session
faceShape     Enum (OVAL, ROUND, SQUARE, HEART, DIAMOND, OBLONG)
landmarks     JSON           // pontos do MediaPipe
foreheadType  String
jawType       String
cheekType     String
skinTone      Enum (WARM, COOL, NEUTRAL)
season        Enum (SPRING, SUMMER, AUTUMN, WINTER)
createdAt     DateTime
```

### Perfil Subjetivo (SubjectiveProfile)
```
id            UUID PK
sessionId     UUID FK → Session
essencePrimary    Enum (CLASSIC, ROMANTIC, NATURAL, DRAMATIC, CREATIVE, NAIVE)
essenceSecondary  Enum?
currentStyle      String      // descrição livre
desiredImage      String      // objetivo de imagem
lifestyle         String?
profession        String?
createdAt         DateTime
```

### Recomendação (Recommendation)
```
id            UUID PK
sessionId     UUID FK → Session
haircut       JSON    // { name, description, reference_images[] }
beard         JSON    // { style, description, reference_images[] }
styling       JSON?   // produtos, cuidados
wardrobe      JSON?   // cores, estilos de roupa
gapAnalysis   String  // texto do GAP
aiModel       String  // modelo usado
aiPrompt      String  // prompt enviado
createdAt     DateTime
```

### Mockup
```
id            UUID PK
sessionId     UUID FK → Session
originalPhoto String  // URL da foto original
overlayData   JSON    // dados do overlay aplicado
resultUrl     String  // URL da imagem final
type          Enum (OVERLAY, AI_GENERATED)
createdAt     DateTime
```

### Dossiê (Dossier)
```
id            UUID PK
sessionId     UUID FK → Session
pdfUrl        String?
publicSlug    String UNIQUE  // link público para cliente
viewCount     Int DEFAULT 0
sections      JSON           // seções incluídas
createdAt     DateTime
expiresAt     DateTime?
```

---

## 3. Fluxo Principal

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────┐
│  1. CADASTRO │───▶│ 2. NOVO      │───▶│ 3. COLETA   │───▶│ 4. FOTOS │
│  do barbeiro │    │    CLIENTE   │    │    SUBJETIVA │    │          │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────┘
                                                                │
                   ┌──────────────┐    ┌─────────────┐         │
                   │ 7. ENTREGA   │◀───│ 6. DOSSIÊ   │◀────────┤
                   │    por link  │    │    gerado   │    ┌──────────┐
                   └──────────────┘    └─────────────┘    │ 5. ANÁLISE│
                                                          │ + MOCKUP │
                                                          └──────────┘
```

### Detalhamento por Etapa

1. **Cadastro**: barbeiro cria conta (magic link), configura loja
2. **Novo cliente**: barbeiro adiciona nome + foto (câmera do celular)
3. **Coleta subjetiva**: questionário rápido (3–5 telas, swipe)
4. **Fotos**: captura frontal (obrigatória) + lateral (opcional)
5. **Análise + Mockup**: IA analisa rosto → gera recomendações → barbeiro aplica mockup
6. **Dossiê**: geração automática do PDF + link interativo
7. **Entrega**: barbeiro compartilha link via WhatsApp com cliente

---

## 4. Arquivos do Projeto

> Auto-atualizado a cada novo arquivo criado

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `.wiki/README.md` | Wiki | Índice da wiki |
| `.wiki/dominio-visagismo.md` | Wiki | Conhecimento de visagismo |
| `.wiki/memoria-produto.md` | Wiki | Este arquivo |
| `.wiki/decisoes.md` | Wiki | Log de decisões |
| `.wiki/estilo-trabalho.md` | Wiki | Preferências de trabalho |
| `.wiki/evolucao.md` | Wiki | Log de evolução |
