# IS 1893 (Part 1) : 2016 — Criteria for Earthquake Resistant Design of Structures
## Part 1: General Provisions and Buildings (Sixth Revision)
### Structured Reference for DPR Compliance Analysis

> **Scope:** Mandatory seismic design provisions for buildings and general structures. Part 1 covers Zones II–V, soil classification, design force calculation (ESM & RSM), structural irregularity classification, and detailing requirements.

---

## 1. SEISMIC ZONE CLASSIFICATION

### Table: Seismic Zones of India (Cl. 3 / Fig. 1)

| Zone | Zone Factor (Z) | Intensity Description |
|------|----------------|----------------------|
| II   | 0.10           | Low damage risk zone |
| III  | 0.16           | Moderate damage risk |
| IV   | 0.24           | High damage risk |
| V    | 0.36           | Very high damage risk |

**Mandatory Rule:** Towns at zone boundary shall be placed in the **higher zone**.

---

## 2. SOIL CLASSIFICATION (Cl. 6.4.2.1 & Table 4)

| Type | Description | SPT N-value |
|------|-------------|-------------|
| Type I — Rock / Hard Soil | Well-graded gravel (GW), well-graded sand (SW) with <5% fines; stiff to hard clays (N > 30) | N > 30 |
| Type II — Medium / Stiff Soil | Poorly graded sands with fines (N: 10–30); stiff to medium fine-grained soils (ML/CL, N: 10–30) | 10 ≤ N ≤ 30 |
| Type III — Soft Soil | All soft soils, SP with N < 10; silts (MI, MH); clays (CI, CH); silt-clay mixes (MI-CI, MH-CH) | N < 10 |

---

## 3. DESIGN ACCELERATION SPECTRUM (Cl. 6.4.2)

### 3.1 Average Spectral Acceleration Coefficient (Sa/g)

#### For Equivalent Static Method (Fig. 2A — 5% Damping):

**Type I — Rock or Hard Soil:**
- T < 0.40 s → Sa/g = 1 + 15T
- 0.40 ≤ T ≤ 4.00 s → Sa/g = 2.50
- T > 4.00 s → Sa/g = 1.00/T

**Type II — Medium Soil:**
- T < 0.55 s → Sa/g = 1 + (15/0.55)T
- 0.55 ≤ T ≤ 4.00 s → Sa/g = 2.50
- T > 4.00 s → Sa/g = 1.36/T

**Type III — Soft Soil:**
- T < 0.67 s → Sa/g = 1 + (15/0.67)T
- 0.67 ≤ T ≤ 4.00 s → Sa/g = 2.50
- T > 4.00 s → Sa/g = 1.67/T

### 3.2 Damping Multiplying Factors (Cl. 6.4.2, Table 3)

| Damping (%) | 0 | 2 | 5 | 7 | 10 | 15 | 20 | 25 | 30 |
|------------|---|---|---|---|----|----|----|----|-----|
| Factor     | 3.20 | 1.40 | 1.00 | 0.90 | 0.80 | 0.70 | 0.60 | 0.55 | 0.50 |

**Note:** Values of Sa/g from Figs. 2A/2B are for 5% damping. Multiply by above factor for other damping values.

---

## 4. DESIGN SEISMIC BASE SHEAR — EQUIVALENT STATIC METHOD (Cl. 7.6)

### 4.1 Design Horizontal Seismic Coefficient (Cl. 6.4.2)

```
Ah = (Z/2) × (Sa/g) / (R/I)
```

Where:
- **Z** = Zone Factor (Table 2)
- **Sa/g** = Design acceleration coefficient (Fig. 2A)
- **R** = Response reduction factor (Table 9)
- **I** = Importance factor (Table 8)

**Minimum Value:** Ah shall not be taken less than Z/2 for any structure with T ≤ 0.1 s.

### 4.2 Design Seismic Base Shear (Cl. 7.6.1)

```
VB = Ah × W
```

Where **W** = Seismic weight of the building (Cl. 7.4)

### 4.3 Fundamental Natural Period (Cl. 7.6.2)

**For RC MRF buildings (without brick infill):**
```
Ta = 0.075 × h^0.75
```

**For RC MRF buildings (with brick infill):**
```
Ta = 0.075 × h^0.75  [multiplied by appropriate factor per 7.6.2]
```

**For Steel MRF buildings:**
```
Ta = 0.085 × h^0.75
```

**For all other buildings (including RC shear wall buildings):**
```
Ta = 0.09 × h / √d
```

Where:
- **h** = Height of building in metres (measured from base)
- **d** = Base dimension of building at plinth level in metres along direction of shaking

### 4.4 Vertical Distribution of Base Shear (Cl. 7.6.3a)

```
Qi = VB × (Wi × hi²) / Σ(Wj × hj²)
```

Where:
- Qi = Design lateral force at floor i
- Wi = Seismic weight of floor i
- hi = Height of floor i from base
- n = Number of storeys

---

## 5. IMPORTANCE FACTOR (I) — Table 8 (Cl. 7.2.3)

| Occupancy Category | I |
|-------------------|---|
| Critical/Post-disaster structures (Hospitals, Fire stations, Power stations, Emergency infrastructure) | 1.5 |
| School, colleges, assembly buildings, monuments (>300 persons), underground facilities, important utilities | 1.2 |
| All other buildings | 1.0 |

---

## 6. RESPONSE REDUCTION FACTOR (R) — Table 9 (Cl. 7.2.6)

| Lateral Force Resisting System | R |
|-------------------------------|---|
| **RC Buildings** | |
| Ordinary RC moment-resisting frame (OMRF) | 3.0 |
| Special RC moment-resisting frame (SMRF) | 5.0 |
| RC shear wall with OMRF | 3.0 |
| RC shear wall with SMRF | 4.0 |
| Dual system: RC shear wall + SMRF (SMRF ≥ 25% base shear) | 5.0 |
| RC frames with URM infill | 3.0 |
| **Steel Buildings** | |
| Ordinary steel moment-resisting frame (OSMRF) | 3.0 |
| Special steel moment-resisting frame (SSMRF) | 5.0 |
| Steel frames with concentric braces (SCBF) | 4.0 |
| Steel frames with eccentric braces (SEBF) | 5.0 |
| **Masonry Buildings** | |
| Load bearing masonry wall buildings (with piers/band) | 1.5 |
| Reinforced masonry | 2.5 |
| **Timber / Light Steel Frame** | |
| Timber structures | 3.0 |

**Critical Rule:** For Zone II only — RC buildings may use R = 3.0 regardless of frame type where specified.

---

## 7. SEISMIC WEIGHT (Cl. 7.4)

### 7.4.1 Seismic Weight of Floors

- Seismic weight = Full Dead Load + Percentage of Live Load as per Table below

### Table: Live Load % to be included as Seismic Weight (Cl. 7.4.1)

| Live Load Intensity | % of Live Load |
|--------------------|---------------|
| Up to 3.0 kN/m²    | 25%           |
| Above 3.0 kN/m²    | 50%           |

**Note:** For roofs, imposed load shall not be included in seismic weight calculation.

### 7.4.2 Seismic Weight — Roofs
Weight of roof shall be included in calculation of seismic weight of the structure.

---

## 8. STRUCTURAL IRREGULARITY CLASSIFICATION

### 8.1 Plan Irregularities (Cl. 7.1, Table 5)

| Type | Description | Trigger Condition |
|------|-------------|-------------------|
| 1A — Torsional | Max storey drift > 1.2× average drift | When Δmax/Δavg > 1.2 |
| 1B — Extreme Torsion | Max storey drift > 1.4× average drift | When Δmax/Δavg > 1.4 |
| 2 — Re-entrant Corners | Plan projection > 15% of plan dimension | Either direction > 15% |
| 3 — Floor Diaphragm Discontinuity | Opening area > 50% gross area OR stiffness change | Area cut-out > 50% |
| 4 — Out-of-plane offsets in vertical elements | Lateral resisting elements offset out-of-plane | Any such offset |
| 5 — Non-parallel Systems | Lateral force resisting elements not parallel to principal axes | Non-parallel arrangement |

### 8.2 Vertical Irregularities (Cl. 7.1, Table 6)

| Type | Description | Trigger Condition |
|------|-------------|-------------------|
| 4A — Stiffness Irregularity (Soft Storey) | Lateral stiffness < 70% of adjacent storey OR < 80% average of three stories above | Ki < 0.70 Ki+1 |
| 4B — Extreme Soft Storey | Lateral stiffness < 60% of adjacent OR < 70% average three above | Ki < 0.60 Ki+1 |
| 4C — Vertical Geometric Irregularity | Horizontal dimension > 1.25× adjacent storey | L2 > 1.25 L1 |
| 4D — In-plane Discontinuity in Lateral Elements | In-plane offset > wall length | Offset > 0.2Lw |
| 4E — Strength Irregularity (Weak Storey) | Lateral strength < 80% of storey above | Si < 0.80 Si+1 |
| 4F — Mass Irregularity | Effective mass > 200% of adjacent storey mass | Mi > 2 × Mi+1 or Mi-1 |
| 4G — Floating/Stub Columns | Columns terminate at non-base level | Any such column |

---

## 9. MANDATORY DYNAMIC ANALYSIS REQUIREMENTS (Cl. 7.7)

### 9.1 When Dynamic Analysis is Mandatory

Linear dynamic analysis **must** be performed for:
1. All buildings **except** regular buildings ≤ 15 m in Seismic Zone II
2. **Irregular buildings** in all zones — regardless of height
3. Buildings with plan or vertical irregularities as per Tables 5 & 6

### 9.2 Response Spectrum Method (Cl. 7.7.5)

- Design acceleration spectrum per Cl. 6.4.2 or site-specific spectrum (Cl. 6.4.7)
- At least **3 modes** to be considered for 2D analysis; **at least 3 modes per direction** for 3D analysis
- Modes to be considered until cumulative mass participation ≥ **90%**

### 9.3 Modal Combination Rules (Cl. 7.7.5.4)

**SRSS (Square Root Sum of Squares):** Use when modal frequencies are well-separated

**CQC (Complete Quadratic Combination):**
```
λ = √[Σ Σ λi × ρij × λj]

ρij = 8ζ² (1+β)β^1.5 / [(1-β²)² + 4ζ²β(1+β)²]
```
Where β = ωj/ωi (frequency ratio), ζ = modal damping ratio

### 9.4 Base Shear Check (Cl. 7.7.3)

If VB (dynamic) < V̄B (static using Ta per Cl. 7.6.2):
- All force quantities shall be scaled up by **V̄B/VB**

---

## 10. COMBINATION OF EARTHQUAKE EFFECTS (Cl. 6.3.2 & 6.3.4)

### 10.1 Two-Directional Ground Motion (Cl. 6.3.2)

When EQX > 0.3 EQY:
```
1.0 EQX + 0.3 EQY
0.3 EQX + 1.0 EQY
```

### 10.2 Three-Directional Ground Motion (Cl. 6.3.4)

```
1.0 EQX + 0.3 EQY + 0.3 EQZ
1.0 EQY + 0.3 EQX + 0.3 EQZ
1.0 EQZ + 0.3 EQX + 0.3 EQY
```

Alternatively (Envelope method):
```
√(EQX² + EQY² + EQZ²)
```

---

## 11. LOAD COMBINATIONS (Cl. 6.3.1.2)

### Mandatory Seismic Load Combinations (IS 456 / IS 800):

```
1.5 (DL + IL)
1.2 (DL + IL ± EL)
1.5 (DL ± EL)
0.9 DL ± 1.5 EL
```

Where EL = Earthquake load (±EQX or ±EQY as applicable)

---

## 12. DESIGN SEISMIC FORCE ON PARTS AND COMPONENTS (Cl. 7.12)

### 12.1 Horizontal Seismic Coefficient for Non-structural Elements

```
Ah_part = (Z/2) × (Sa/g) × (I/R) × (Ap/Wp)
```

Where:
- Ap = Force amplification factor per Table 11
- Wp = Weight of component

### Table 11: Amplification Factors for Parts and Components (Cl. 7.12.1)

| Component | Ap |
|-----------|-----|
| Architectural component (general) | 1.0 |
| Cantilever parapets | 2.5 |
| Exterior walls/cladding | 1.0 |
| Mechanical/electrical equipment | 1.0 |
| Contents of high-risk/toxic material | 2.0 |

---

## 13. STOREY DRIFT LIMITATIONS (Cl. 7.11)

### 13.1 Permissible Storey Drift

```
Δ ≤ 0.004 × hs
```

Where hs = Height of storey under consideration

**Note:** Displacement estimates from dynamic analysis shall NOT be scaled (Cl. 7.11.1.2).

### 13.2 Deformation Capability of Non-seismic Members (Cl. 7.11.2)

For Zone III, IV, V — structural members not part of seismic force resisting system must withstand induced forces from R × Δs (storey deformation).

---

## 14. SPECIAL PROVISIONS — RC FRAME BUILDINGS WITH OPEN STOREYS (Cl. 7.10)

### 14.1 Open Storey Definition
Buildings with URM infill discontinued at any storey (commonly ground floor pilotis).

### 14.2 Mandatory Requirements (Cl. 7.10.1–7.10.4)

- Stiffness and strength **must be increased** to required level in open storey
- RC structural walls **must be provided**, founded on proper foundations, continuous full height
- RC structural wall plan density (ρsw) ≥ **2%** along each principal direction in Zones III, IV, V
- RC structural walls must comply with IS 13920

### 14.3 Applicable Multiplying Factors for Open Storey Buildings (Cl. 7.10.1, Table 6)

| System | Multiplying Factor |
|--------|-------------------|
| Buildings without RC structural walls | 2.5 (for open storey) |
| Buildings with RC structural walls | Per detailed provisions |

---

## 15. RC FRAME PLAN DENSITY REQUIREMENTS (Cl. 7.10.4)

```
ρsw = (Area of RC walls in plan direction) / (Total floor area) ≥ 0.02
```

Applicable for Seismic Zones III, IV, V.

---

## 16. SEPARATION BETWEEN ADJACENT STRUCTURES (Cl. 7.11.3)

**Minimum seismic gap:**
```
δ = R × Δs (computed as per 7.11.1)
```
Or calculated from:
```
δ = 0.004 × R × hs
```

For buildings of different heights:
```
δtotal = √(δ1² + δ2²)
```

---

## 17. COLUMN & BEAM DUCTILITY — KEY PROVISIONS

### 17.1 Strong Column — Weak Beam (Cl. 7.9.1)

Sum of moment capacities of columns ≥ 1.1 × Sum of moment capacities of beams at any joint.

### 17.2 Shear Wall Requirements (Zones III–V)

- RC structural walls designed and detailed per IS 13920
- Minimum wall thickness: 150 mm
- Minimum reinforcement ratio: 0.25% each direction

---

## 18. RESPONSE REDUCTION FACTOR APPLICATION RULES (Cl. 7.2.6)

1. R value applies to entire lateral force resisting system — must be consistent
2. Buildings using dual systems: SMRF must resist ≥ 25% of design seismic base shear independently
3. **Cannot** mix R values from different system types within same direction
4. Buildings in Zones III, IV, V — ordinary RC frames (OMRF, R=3) permitted only for height ≤ 15 m

---

## 19. OVERTURNING MOMENT CHECK (Cl. 7.8)

```
M_ot = Σ Qi × hi   (sum over all floors)
```

Overturning moment shall be distributed to lateral force resisting elements proportional to their lateral stiffness.

---

## 20. ACCIDENTAL ECCENTRICITY (Cl. 7.9.2)

Design eccentricity to account for accidental torsion:
```
edi = 1.5 × esi ± 0.05bi   (for Cl. 7.9.2a)
     = esi ± 0.05bi        (for Cl. 7.9.2b)
```

Where:
- esi = Static eccentricity at floor i
- bi = Floor plan dimension perpendicular to direction of ground motion

---

## 21. SITE-SPECIFIC SPECTRUM (Cl. 6.4.7)

Shall be used when:
- Site is within 10 km of known active fault
- Structures of special importance are located on soft soils (Type III)
- Site amplification effects are significant

Site-specific spectrum must be developed by qualified geotechnical/seismological specialist.

---

## 22. LIQUEFACTION ASSESSMENT (Annexure F — Cl. 6.5)

### 22.1 Susceptible Sites
- Saturated sandy/silty soils with N < 15 (SPT value)
- Sites in Zones III, IV, V

### 22.2 Simplified Procedure (Cl. 6.5)

**Step 1 — Cyclic Stress Ratio (CSR):**
```
CSR = 0.65 × (σvo/σ'vo) × (amax/g) × rd
```

**rd (depth reduction factor):**
```
rd = 1.0 - 0.00765z    for z ≤ 9.15 m
rd = 1.174 - 0.0267z   for 9.15 < z ≤ 23.0 m
```

**Step 2 — Factor of Safety:**
```
FS = CRR₇.₅ / CSR
```

If FS < 1.0 → site is liquefiable.

If FS ≥ 1.2 → earthquake-related permanent ground deformation is generally small.

### 22.3 SPT-Based CRR Estimation (Fig. 8)

- Use (N1)₆₀ corrected blow count
- CRR₇.₅ read from Fig. 8 (SPT Clean Sand Base Curve, Mw = 7.5)

**Correction factors for non-standard SPT:**

| Correction | Factor |
|-----------|--------|
| Non-standard hammer weight (CHT) | 0.75 (donut with rope/pulley); 1.33 (donut trip/auto) |
| Short rod length (CRL) — 0–3 m | 0.75 |
| Short rod length (CRL) — 3–4 m | 0.80 |
| Short rod length (CRL) — 4–6 m | 0.85 |
| Short rod length (CRL) — 6–10 m | 0.95 |
| Short rod length (CRL) — 10–30 m | 1.00 |
| Borehole diameter 65–115 mm | 1.00 |
| Borehole diameter 150 mm | 1.05 |
| Borehole diameter 200 mm | 1.15 |

---

## 23. KEY DEFINITIONS (Cl. 3)

| Term | Definition |
|------|-----------|
| Base | Level at which inertia forces are considered to be transferred |
| Centre of Mass | Point where total mass is assumed concentrated |
| Centre of Rigidity | Point where resultant of restoring forces acts |
| Design Basis Earthquake (DBE) | Earthquake that produces the design seismic force (DBE = MCE/2) |
| Diaphragm | Floor/roof system that transfers lateral forces to vertical elements |
| Flexible Building | Fundamental natural period > 1.0 s |
| Irregular Building | Building with plan or vertical irregularities |
| Liquefaction | Phenomenon where soil loses strength under cyclic loading |
| Response Reduction Factor (R) | Factor to account for ductility, over-strength, and redundancy |
| Seismic Weight (W) | DL + appropriate fraction of LL |
| Soft Storey | Storey with lateral stiffness < 70% of storey above |
| Weak Storey | Storey with lateral strength < 80% of storey above |

---

## 24. DESIGN BASE SHEAR — WORKED FORMULA SUMMARY

```
Step 1: Determine Zone Factor Z (Table 2)
Step 2: Determine Importance Factor I (Table 8)
Step 3: Determine R (Table 9)
Step 4: Classify soil type (Table 4) → get Sa/g from Fig. 2A
Step 5: Ah = (Z/2) × (I/R) × (Sa/g)
Step 6: VB = Ah × W
Step 7: Distribute VB using: Qi = VB × (Wi × hi²) / Σ(Wj × hj²)
```

---

## 25. DPR COMPLIANCE CHECKLIST — IS 1893 (Part 1) : 2016

### Section A: Site and Zone Data

- [ ] **A1.** Seismic zone correctly identified from Fig. 1 (Zones II–V)
- [ ] **A2.** Zone factor Z correctly assigned (Table 2)
- [ ] **A3.** Soil type established from borehole/SPT data (Table 4 — Type I/II/III)
- [ ] **A4.** For sites near active faults (< 10 km) or on soft soil — site-specific spectrum used (Cl. 6.4.7)
- [ ] **A5.** Liquefaction assessment done for Zones III–V with sandy/silty soils (Cl. 6.5 / Annexure F)

### Section B: Design Parameters

- [ ] **B1.** Importance factor I correctly assigned per occupancy (Table 8)
- [ ] **B2.** Response reduction factor R correctly selected for structural system (Table 9)
- [ ] **B3.** R value consistent with structural detailing standard (IS 13920 for SMRF)
- [ ] **B4.** Dual system — SMRF independently carries ≥ 25% of seismic base shear (Cl. 7.2.6)
- [ ] **B5.** Design horizontal seismic coefficient Ah calculated correctly: Ah = (Z/2)(I/R)(Sa/g)
- [ ] **B6.** Sa/g read from correct soil type curve at design period (Fig. 2A for ESM, Fig. 2B for RSM)

### Section C: Natural Period and Base Shear

- [ ] **C1.** Fundamental period Ta calculated using correct formula for structural system (Cl. 7.6.2)
- [ ] **C2.** Seismic weight W computed correctly (DL + 25%/50% LL as applicable, no roof LL) (Cl. 7.4)
- [ ] **C3.** Design base shear VB = Ah × W computed
- [ ] **C4.** Lateral force distribution computed: Qi = VB × (Wi×hi²)/Σ(Wj×hj²) (Cl. 7.6.3)

### Section D: Dynamic Analysis

- [ ] **D1.** Dynamic analysis performed for: irregular buildings; height > 15 m in Zone II; all buildings in Zones III–V (Cl. 7.7.1)
- [ ] **D2.** Minimum 90% cumulative mass participation achieved in modes considered (Cl. 7.7.5)
- [ ] **D3.** Modal combination method stated (SRSS or CQC — CQC preferred for closely spaced modes)
- [ ] **D4.** Dynamic base shear VB checked against static estimate V̄B — scaling applied if VB < V̄B (Cl. 7.7.3)

### Section E: Irregularity Assessment

- [ ] **E1.** Plan irregularity checked against all 5 types (Table 5 / Cl. 7.1)
- [ ] **E2.** Vertical irregularity checked against all 4+ types (Table 6 / Cl. 7.1)
- [ ] **E3.** Buildings with soft/weak storey identified — strengthening measures provided (Cl. 7.10)
- [ ] **E4.** Open storey buildings — RC structural wall plan density ≥ 2% in Zones III–V (Cl. 7.10.4)
- [ ] **E5.** Torsional irregularity check: Δmax/Δavg ≤ 1.2 (if > 1.4 = extreme torsion)

### Section F: Structural Detailing

- [ ] **F1.** SMRF buildings designed and detailed per IS 13920 (Cl. 7.7, 7.10.5)
- [ ] **F2.** RC shear walls designed per IS 13920 (Cl. 7.10.5)
- [ ] **F3.** Strong column–weak beam condition verified at all joints (Cl. 7.9.1): ΣMc ≥ 1.1 × ΣMb
- [ ] **F4.** Column ductility — short column effects addressed where infill interrupts column height
- [ ] **F5.** URM infill modelled as equivalent diagonal strut where required (Cl. 7.9)

### Section G: Deformation and Separation

- [ ] **G1.** Storey drift ≤ 0.004 × storey height under design seismic force (Cl. 7.11.1)
- [ ] **G2.** Seismic separation gap provided between adjacent blocks per Cl. 7.11.3
- [ ] **G3.** Non-seismic members checked for deformation compatibility at R × Δs (Cl. 7.11.2)

### Section H: Load Combinations

- [ ] **H1.** All four IS 456/IS 800 seismic load combinations used (Cl. 6.3.1.2)
- [ ] **H2.** Bi-directional effects considered: 1.0EQX + 0.3EQY and vice versa (Cl. 6.3.2)
- [ ] **H3.** For 3D analysis, tri-directional combination used where applicable (Cl. 6.3.4)

### Section I: Non-structural Components

- [ ] **I1.** Seismic design force for parts/components calculated using Ap factors (Cl. 7.12, Table 11)
- [ ] **I2.** Façade, parapets, cladding and MEP equipment anchored for seismic forces

### Section J: Documentation

- [ ] **J1.** Design report states zone, soil type, I, R, Ah, T, VB explicitly
- [ ] **J2.** Irregularity classification explicitly stated (or "Regular" confirmed)
- [ ] **J3.** Analysis method stated (ESM or RSM) with justification
- [ ] **J4.** Liquefaction potential assessed and reported (Zones III–V, cohesionless soils)
- [ ] **J5.** Compliance with IS 13920 stated for ductile detailing (Zones III–V)

---

## 26. CRITICAL DEFICIENCY FLAGS FOR AUTOMATED ANALYSIS

| # | Flag Condition | Severity |
|---|---------------|----------|
| 1 | Zone factor Z missing or incorrectly assigned | **CRITICAL** |
| 2 | Soil type not established from site investigation | **CRITICAL** |
| 3 | R value inconsistent with structural system or detailing | **CRITICAL** |
| 4 | Dynamic analysis not performed for irregular building | **CRITICAL** |
| 5 | Open storey building without RC wall density ≥ 2% in Zone III–V | **CRITICAL** |
| 6 | IS 13920 compliance not stated for SMRF in Zone III–V | **CRITICAL** |
| 7 | Liquefaction potential not assessed in Zone III–V with sand/silt | **MAJOR** |
| 8 | Storey drift check not performed or > 0.004hs | **MAJOR** |
| 9 | Modal mass participation < 90% in dynamic analysis | **MAJOR** |
| 10 | Strong column–weak beam condition not verified | **MAJOR** |
| 11 | Seismic separation gap not provided between adjacent blocks | **MAJOR** |
| 12 | Bi-directional seismic combination not applied | **MAJOR** |
| 13 | Irregularity classification not documented | **MINOR** |
| 14 | Non-structural seismic force design not addressed | **MINOR** |
| 15 | Accidental eccentricity not applied in torsion design | **MINOR** |

---

*Reference: IS 1893 (Part 1): 2016, Bureau of Indian Standards. Sixth Revision, December 2016.*
*Extracted for DPR Compliance Analysis — mandatory provisions only. Excludes commentary, derivations, and examples.*
