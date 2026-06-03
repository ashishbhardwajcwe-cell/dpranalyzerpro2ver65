# IRC:37-2018 — Guidelines for the Design of Flexible Pavements (Fourth Revision)
## Structured Extraction for DPR Compliance Analysis

> **Source:** IRC:37-2018, Indian Roads Congress, November 2018  
> **Extraction Scope:** Mandatory requirements, design tables, formulas, and DPR compliance checklist only.  
> **Excluded:** Theory, derivations, worked examples, background text.

---

## 1. SCOPE & APPLICABILITY

| Condition | Applicable Standard |
|---|---|
| Design traffic ≥ 2 msa (new/reconstructed pavements) | IRC:37-2018 |
| Design traffic < 2 msa | IRC:SP:72 |
| Rehabilitation of in-service pavements (overlay) | IRC:115 (FWD method) or IRC:81 (BBD method) |

---

## 2. DESIGN PARAMETERS — MANDATORY INPUTS

### 2.1 Traffic Inputs Required

- Initial traffic (two-way) in CVPD (commercial vehicles ≥ 3 tonnes laden weight)
- Annual traffic growth rate(s)
- Design life (years)
- Axle load spectrum (mandatory for pavements with CTB layer)
- Vehicle Damage Factor (VDF)
- Lateral distribution factor

### 2.2 Traffic Growth Rate

- Minimum annual growth rate: **5%** (use when actual rate unavailable or estimated rate < 5%)

### 2.3 Design Period

| Road Category | Design Period |
|---|---|
| National Highways, State Highways, Urban Roads | 20 years |
| Other categories | 15 years |
| Very high density corridors (> 300 msa) and Expressways | Long-life (50 years) or minimum 30 years |

### 2.4 Vehicle Damage Factor (VDF) — Axle Load Equivalence Equations

| Axle Type | Equivalence Formula |
|---|---|
| Single axle, single wheel each side | (Axle load in kN / 65)⁴ &nbsp;&nbsp;&nbsp; ...(4.1) |
| Single axle, dual wheel each side | (Axle load in kN / 80)⁴ &nbsp;&nbsp;&nbsp; ...(4.2) |
| Tandem axle, dual wheel each side | (Axle load in kN / 148)⁴ &nbsp;&nbsp;&nbsp; ...(4.3) |
| Tridem axle, dual wheel each side | (Axle load in kN / 224)⁴ &nbsp;&nbsp;&nbsp; ...(4.4) |

**Indicative VDF Values (Table 4.2) — when axle load data unavailable:**

| Initial Two-Way Traffic (CVPD) | Rolling/Plain | Hilly |
|---|---|---|
| 0–150 | 1.7 | 0.6 |
| 150–1500 | 3.9 | 1.7 |
| > 1500 | 5.0 | 2.8 |

### 2.5 Lateral Distribution Factors

| Carriageway Type | Factor (D) |
|---|---|
| Single lane | 1.0 (total both directions) |
| Intermediate lane (5.5 m width) | 0.75 |
| Two-lane two-way | 0.50 |
| Four-lane single carriageway | 0.40 |
| Dual two-lane carriageway | 0.75 per direction |
| Dual three-lane carriageway | 0.60 per direction |
| Dual four-lane carriageway | 0.45 per direction |

### 2.6 Design Traffic Calculation

**Equation 4.5:**

> N_Des = [365 × {(1 + r)ⁿ − 1} / r] × A × D × F

Where:
- N_Des = cumulative standard axles (msa)
- A = initial traffic (CVPD) at year of construction completion
- D = lateral distribution factor
- F = VDF
- n = design life (years)
- r = annual growth rate (decimal)

**Equation 4.6 — Traffic at construction completion:**

> A = P × (1 + r)ˣ

Where P = last traffic count (CVPD), x = years from count to construction completion

### 2.7 Axle Load Survey Minimum Sample Size (Table 4.1)

| Traffic Volume (CVPD) | Minimum Sample |
|---|---|
| < 3000 | 20% |
| 3000–6000 | 15% (min 600 cvpd) |
| > 6000 | 10% (min 900 cvpd) |

---

## 3. SUBGRADE

### 3.1 Minimum Subgrade Requirements

- Top 500 mm below pavement designated as subgrade
- Minimum compaction: **97% of laboratory maximum dry density** (Heavy Proctor, IS:2720 Part-8) — for Expressways, NHs, SHs, MDRs, and heavily trafficked roads
- Minimum effective CBR: **> 5%** for roads with > 450 CVPD (two-way)
- Maximum design resilient modulus of subgrade: **100 MPa** (cap value)

### 3.2 CBR Design Value

| Road Category | Design CBR Percentile |
|---|---|
| Expressways, NHs, SHs, Urban Roads | 90th percentile |
| Other categories (design traffic < 20 msa) | 80th percentile |
| Other categories (design traffic ≥ 20 msa) | 90th percentile |

- CBR test: 4-day soaked, remoulded at minimum 97% Proctor density at OMC
- Minimum 3 specimens per soil type

### 3.3 Resilient Modulus from CBR

**Equations 6.1 & 6.2:**

| CBR Range | Formula |
|---|---|
| CBR ≤ 5% | M_RS = 10.0 × CBR (MPa) |
| CBR > 5% | M_RS = 17.6 × (CBR)^0.64 (MPa) |

Poisson's ratio for subgrade: **0.35**

### 3.4 Water Table Clearance

- Minimum clearance from bottom of subgrade to water table/HFL: **1.0 m** (new roads)
- Existing roads with no history of overtopping: **0.6 m**

---

## 4. SUB-BASE

### 4.1 Granular Sub-Base (GSB) — Minimum Thickness Requirements

| Condition | Minimum Thickness |
|---|---|
| Drainage layer (each) | 100 mm |
| Filter/separation layer (each) | 100 mm |
| Combined single drainage-cum-filter layer | 150 mm |
| Any compacted granular layer | ≥ 2.5 × nominal maximum aggregate size (min 100 mm) |

- GSB must be checked for **construction traffic** OR **10,000 standard axle repetitions**, whichever is more.
- GSB gradations III & IV (MoRTH): drainage layer; I, II, V & VI: filter/separation layer.

### 4.2 GSB Resilient Modulus

**Equation 7.1:**

> M_RGRAN = 0.2 × h^0.45 × M_RSUPPORT

Where:
- h = thickness of granular layer (mm)
- M_RGRAN = resilient modulus of granular layer (MPa)
- M_RSUPPORT = effective resilient modulus of supporting layer (MPa)

Poisson's ratio for GSB: **0.35**

### 4.3 Cementitious Sub-Base (CTSB)

- Minimum thickness: **200 mm**
- Required 7-day UCS: **1.5–3.0 MPa** (as per IRC:SP:89)
- CTSB with UCS 0.75–1.5 MPa: usable only for design traffic < 10 msa
- Design elastic modulus (for analysis): **600 MPa** (for UCS 1.5–3.0 MPa); **400 MPa** (for UCS 0.75–1.5 MPa)
- Curing: minimum **3 days** before next layer (or 7 days if strength not achieved)
- Poisson's ratio: **0.25**

**Equation 7.2 (also used for CTB):**

> E_CTSB = 1000 × UCS (MPa)

---

## 5. BASE LAYERS

### 5.1 Unbound (Granular) Base

- Minimum thickness: **150 mm** (except crack relief layer over CTB: 100 mm)
- Granular base on CTSB: resilient modulus = **300 MPa** (natural gravel) / **350 MPa** (crushed rock)
- Poisson's ratio: **0.35**

### 5.2 Cement Treated Base (CTB)

- Minimum thickness: **100 mm**
- Required UCS: **4.5–7.0 MPa** in 7/28 days (as per IRC:SP:89)
- Laboratory average strength: must be ≥ **1.5 × required field strength**
- Design elastic modulus for analysis: **5000 MPa**
- Poisson's ratio: **0.25**
- Curing: minimum **7 days** before next layer, starting immediately with bitumen emulsion/wet jute mat

**Modulus of Rupture (Flexural Strength) of CTB:**
- = 20% of 28-day UCS value (MPa)
- Maximum limits:

| Material | Max M_RUP |
|---|---|
| Cementitious stabilised aggregates | 1.40 MPa |
| Lime-flyash-soil | 1.05 MPa |
| Soil-cement | 0.70 MPa |

**Durability Criterion:** Loss of weight ≤ **14%** after 12 cycles of wetting & drying (BIS:4332 Part-IV). Freeze-thaw test also required in cold/snow-bound regions.

### 5.3 Crack Relief Layer (Mandatory with CTB)

- Dense graded WMM: **100 mm** thick
- OR SAMI (elastomeric modified binder): 10–12 kg/10 m² + 0.1 m³ of 11.2 mm aggregates
- SAMI is **NOT** included in structural analysis
- Granular crack relief layer modulus (WMM sandwiched): **450 MPa**
- Compaction of granular crack relief layer: **100% modified Proctor density**
- Poisson's ratio: **0.35**

### 5.4 Bitumen Emulsion / Foamed Bitumen Treated RAP Base

- Minimum thickness: **100 mm**
- Design resilient modulus: **800 MPa**
- VG30 bitumen recommended for foamed bitumen
- ITS requirements (ASTM D6931, 102 mm Marshall specimen, 50 mm/min at 25°C):
  - Minimum after soaking: **100 kPa**
  - Minimum dry condition: **225 kPa**
- Poisson's ratio: **0.35**

---

## 6. BITUMINOUS LAYERS

### 6.1 Mix and Binder Selection (Table 9.1)

| Traffic Level | Surface Course Mix | Surface Binder | Base/Binder Mix | Base Binder |
|---|---|---|---|---|
| > 50 msa | SMA, GGRB, BC | Modified / VG40 (SMA), Crumb rubber (GGRB), Modified (BC) | DBM | VG40 |
| 20–50 msa | SMA, GGRB, BC | Modified / VG40 (SMA), Crumb rubber (GGRB), Modified / VG40 (BC) | DBM | VG40 |
| < 20 msa | BC/SDBC/PMC/MSS/SD (+ SMA, GGRB, BC with modified binders) | VG40 or VG30 | DBM/BM | VG40 or VG30 |

**Special Requirements:**
- Expressways and NHs (even if < 20 msa): **VG40 or modified** for surface; **VG40** for DBM
- VG40 used in surface/binder/base courses: minimum viscosity **3600 Poise at 60°C**
- Snow-bound locations: **VG10** may be used
- Total bituminous layer < 40 mm: **VG30** for BC/SDBC
- High rainfall areas, junctions: **Mastic Asphalt** may be used

### 6.2 Resilient Modulus of Bituminous Mixes — Design Values (Table 9.2)

Measured at **35°C** per ASTM:4123, Poisson's ratio = 0.35 assumed. Design value = **lesser of measured or table value below**.

| Mix Type | 35°C (MPa) |
|---|---|
| BC and DBM, VG10 | 1000 |
| BC and DBM, VG30 | 2000 |
| BC and DBM, VG40 | 3000 |
| BC with Modified Bitumen (IRC:SP:53) | 1600 |
| BM, VG10 | 500 |
| BM, VG30 | 700 |
| RAP with 4% bitumen emulsion/foamed bitumen | 800 |

**Snow-bound areas:** measure modulus at **20°C**; use lesser of measured and table value.

### 6.3 DBM Rich Bottom Layer Requirements

| DBM Layer | Target Air Voids (Mix Design) | Field Compaction Target |
|---|---|---|
| Single layer DBM | 3.5% | ≤ 4.5% |
| Bottom layer of two-layer DBM system | 3.0% | ≤ 4.0% |

- VFB upper limit for rich bottom mixes: **80%**
- V_a and V_be from mix design used in fatigue equations (3.3 / 3.4)

### 6.4 Minimum Bituminous Layer Thickness

- As per MoRTH and IRC specifications
- Pavements with CTB base (design traffic > 20 msa): combined surface + base/binder course ≥ **100 mm**

---

## 7. PERFORMANCE CRITERIA & DESIGN EQUATIONS

### 7.1 Standard Load Conditions for Analysis (Table 3.1)

| Parameter | Value |
|---|---|
| Material response model | Linear elastic |
| Layer interface | Fully bonded |
| Standard axle | 80 kN (single axle, dual wheels) |
| Wheel load (each) | 20 kN |
| Centre-to-centre wheel spacing | 310 mm |
| Contact stress (bituminous layer / subgrade analysis) | 0.56 MPa |
| Contact stress (CTB fatigue analysis) | 0.80 MPa |
| Tyre contact shape | Circular |

### 7.2 Reliability Levels

| Road Category / Traffic | Reliability |
|---|---|
| Expressways, NHs, SHs, Urban Roads (all traffic) | 90% |
| Other categories, design traffic ≥ 20 msa | 90% |
| Other categories, design traffic < 20 msa | 80% |

### 7.3 Subgrade Rutting Performance Models

Failure criterion: average rut depth ≥ **20 mm**

**Equation 3.1 (80% reliability):**
> N_R = 4.1656 × 10⁻⁸ × (1/ε_v)^4.5337

**Equation 3.2 (90% reliability):**
> N_R = 1.4100 × 10⁻⁸ × (1/ε_v)^4.5337

Where:
- N_R = subgrade rutting life (cumulative 80 kN standard axles)
- ε_v = vertical compressive strain at top of subgrade

### 7.4 Bituminous Layer Fatigue Cracking Performance Models

Failure criterion: cracked area ≥ **20% of paved surface**

**Equation 3.3 (80% reliability):**
> N_f = 1.6064 × C × 10⁻⁴ × (1/ε_t)^3.89 × (1/M_Rm)^0.854

**Equation 3.4 (90% reliability):**
> N_f = 0.5161 × C × 10⁻⁴ × (1/ε_t)^3.89 × (1/M_Rm)^0.854

Where:
- N_f = fatigue life of bituminous layer
- ε_t = maximum horizontal tensile strain at bottom of bottom bituminous layer
- M_Rm = resilient modulus of bottom bituminous layer (MPa)
- C = 10^M, and M = 4.84 × (V_be / (V_a + V_be) − 0.69)
- V_a = % air void volume in bottom bituminous layer mix
- V_be = % effective bitumen volume in bottom bituminous layer mix

### 7.5 CTB Fatigue Performance Models

**Equation 3.5 (standard axle based — mandatory check):**

> N = RF × [(113000 / E^0.804 + 191) / ε_t]^12

Where:
- RF = 1 for Expressways, NHs, SHs, Urban Roads and other categories with design traffic > 10 msa
- RF = 2 for all other cases
- E = elastic modulus of CTB material (MPa)
- ε_t = tensile strain at bottom of CTB layer (microstrain)
- N must be ≥ design traffic

**Equation 3.6 (cumulative fatigue damage — axle load spectrum based):**

> log₁₀(N_fi) = [0.972 − (σ_t / M_Rup)] / 0.0825

Where:
- N_fi = fatigue life of CTB for axle load class i
- σ_t = tensile stress at bottom of CTB for given axle load
- M_Rup = 28-day flexural strength of cementitious base (MPa)

**Equation 3.7 — Cumulative Fatigue Damage (CFD):**

> CFD = Σ (n_i / N_fi)

- CFD < 1.0: design acceptable
- CFD > 1.0: revise pavement section

**Tandem axle conversion:** each tandem axle = 2 single axles (50% each)  
**Tridem axle conversion:** each tridem axle = 3 single axles (1/3 each)

### 7.6 Long-Life Pavement Criteria

Design traffic threshold: ≥ **300 msa**

| Critical Parameter | Limiting Strain (Indian plains, 35°C) |
|---|---|
| Horizontal tensile strain in bituminous layer | ≤ 80 microstrain |
| Vertical compressive strain on subgrade | ≤ 200 microstrain |

### 7.7 Stage Construction Rules

- Base and sub-base layers: designed for **full design period**
- Stage construction: **NOT permitted** for pavements with CTB/CTSB
- Stage-1 bituminous layer design traffic = **1.67 × stage-1 period traffic** (to retain ≥ 40% life after Stage-1)
- Second stage thickness: determined by FWD (IRC:115) or BBD (IRC:81) evaluation after Stage-1

---

## 8. SOFTWARE & ANALYSIS REQUIREMENTS

### 8.1 IITPAVE Software

- Mandatory software: **IITPAVE** (updated FPAVE, developed IIT Kharagpur for MoRTH R-56)
- Analysis model: Linear elastic layered system
- Maximum layers analysable: **10 (including subgrade)**

### 8.2 Standard Analysis Inputs

| Input | Value |
|---|---|
| Wheel load | 20,000 N per wheel (standard) |
| Tyre pressure (general) | 0.56 MPa |
| Tyre pressure (CTB fatigue) | 0.80 MPa |
| Wheel configuration | Dual wheel (2 wheels, 310 mm c/c) |
| Single wheel load (for effective subgrade modulus) | 40,000 N |

### 8.3 Critical Analysis Points

| Layer | Critical Parameter | Location |
|---|---|---|
| Bituminous layer | Tensile strain | Bottom of layer |
| CTB | Tensile strain AND tensile stress | Bottom of layer |
| Subgrade | Compressive strain | Top of subgrade |

- Use **absolute values** (ignore sign) in all performance equations
- For interface points: use upper-layer values for bituminous bottom strain; lower-layer ("L" suffix) values for subgrade top strain

### 8.4 Recommended Material Properties for Analysis (Table 11.1)

| Material | Elastic/Resilient Modulus (MPa) | Poisson's Ratio |
|---|---|---|
| Bituminous layer (VG40 or Modified) | 3000 or tested (lesser) | 0.35 |
| Bituminous layer (VG30) | 2000 or tested (lesser) | 0.35 |
| Cement treated base (CTB) | 5000 | 0.25 |
| Cold recycled base (RAP) | 800 | 0.35 |
| Granular crack relief layer | 450 | 0.35 |
| Cement treated sub-base (CTSB) | 600 | 0.25 |
| Unbound granular layers | Equation 7.1 | 0.35 |
| Granular base over CTSB (natural gravel) | 300 | 0.35 |
| Granular base over CTSB (crushed aggregate) | 350 | 0.35 |
| Subgrade | Equations 6.1 or 6.2 | 0.35 |

---

## 9. FROST-AFFECTED AREA REQUIREMENTS

- Fine-grained clayey/silty soils: most susceptible to frost
- Minimum total pavement thickness in frost-affected areas: **450 mm** (regardless of subgrade CBR)
- Drainage: water must not collect at subgrade level (capillary cut-off required where applicable)

---

## 10. QUALITY CONTROL TESTS DURING CONSTRUCTION (Section 14)

| S.No. | Item | Test | Frequency |
|---|---|---|---|
| 1 | Bituminous construction | Resilient modulus (from ITS on field mix specimens) | 3 specimens per 400 tonnes, min 2 tests/day |
| 2 | Cement treated/stabilised base & sub-base | Unconfined compressive strength | 3 specimens per 400 tonnes, min 2 tests/day |
| 3 | Cement treated/stabilised base & sub-base | Binder/cement content | 3 specimens per 400 tonnes, min 2 tests/day |
| 4 | Cement treated/stabilised base & sub-base | Flexural / Indirect tensile strength | 3 specimens per 400 tonnes, min 2 tests/day |
| 5 | Cement treated/stabilised base & sub-base | Soundness test (BIS 4332 Part IV) | 1 per source; repeat if aggregate quality changes |
| 6 | Cement treated/stabilised base & sub-base | Density of compacted layer | 1 per 500 m², 2 tests |
| 7 | Emulsion/Foam bitumen | Indirect tensile strength | 3 specimens per 400 tonnes, min 2 tests/day |
| 8 | Emulsion/Foam bitumen | Density of compacted layer | 1 per 1000 m² |

**Note:** If measured M_R from ITS is < 90% of design value, recheck per ASTM 4123.

---

## 11. PAVEMENT DESIGN PROCEDURE — MANDATORY STEPS (Section 11.1)

1. **Select trial pavement composition** — based on functional requirements
2. **Conduct bituminous mix design** — determine resilient modulus (test or empirical)
3. **Select trial layer thicknesses** — subject to minimum thickness requirements in guidelines
4. **Analyse using IITPAVE** — compute stresses, strains, deflections at critical locations
5. **Compute allowable strains** — from performance models (Eqs. 3.1–3.6)
6. **Iterate layer thicknesses** — until computed strains ≤ allowable strains
7. **CFD check (if CTB present)** — cumulative fatigue damage must be < 1.0
8. **Verify minimum thicknesses** — from Section 7, 8, 9

---

## 12. PAVEMENT STRUCTURAL DESIGN CATALOGUES — COVERAGE (Section 12)

Catalogues apply for design traffic **≤ 50 msa only** and for **initial estimation purposes**.  
For all roads > 2 msa: **site-specific IITPAVE analysis is mandatory**.

### Catalogue Categories (Figs. 12.1–12.48)

| Cat. | Pavement Composition | Figure Range |
|---|---|---|
| (a) | Bituminous + Granular Base + GSB | 12.1–12.8 (CBR 5%–15%) |
| (b) | Bituminous + CTSB + CTB + Granular Crack Relief | 12.9–12.16 |
| (c) | Bituminous + CTSB + CTB + SAMI | 12.17–12.24 |
| (d) | Bituminous + CTSB + Emulsion/Foam RAP Base | 12.25–12.32 |
| (e) | Bituminous + GSB + CTB + Granular Crack Relief | 12.33–12.40 |
| (f) | Bituminous + CTSB + Granular Base (WMM) | 12.41–12.48 |

### Catalogue Assumptions

- 80% reliability: design traffic ≤ 20 msa
- 90% reliability: design traffic > 20 msa (Expressways/NHs: 90% regardless)
- Bituminous modulus: 2000 MPa (VG30, ≤ 20 msa); 3000 MPa (VG40, 20–50 msa)

---

## 13. DPR COMPLIANCE CHECKLIST — IRC:37-2018

### A. Traffic Data

- [ ] Traffic count: 7-day, 24-hour count per IRC:9 documented
- [ ] CVPD stated; commercial vehicles ≥ 3 tonnes laden weight only
- [ ] Annual growth rate established per IRC:108; minimum 5% used if actual < 5%
- [ ] Design period stated (20 yr / 15 yr / 30 yr+) and justified per Section 4.3
- [ ] Axle load spectrum survey conducted (mandatory if CTB layer proposed)
- [ ] Axle load survey sample size meets Table 4.1 minimums
- [ ] VDF calculated from survey data or Table 4.2 (if data unavailable, justified)
- [ ] Lateral distribution factor applied per Section 4.5 for carriageway type
- [ ] Design traffic (N_Des) computed using Equation 4.5; value in msa stated
- [ ] Traffic at construction completion year computed using Equation 4.6

### B. Subgrade

- [ ] Minimum 3 CBR specimens per soil type tested
- [ ] CBR: 4-day soaked, remoulded at ≥ 97% Proctor density at OMC
- [ ] Design CBR percentile correct for road category (80th or 90th) per Section 6.2.2
- [ ] Effective subgrade CBR > 5% for traffic > 450 CVPD
- [ ] Resilient modulus calculated from Equations 6.1 / 6.2
- [ ] Effective modulus capped at 100 MPa maximum
- [ ] Water table clearance ≥ 1.0 m (new roads) stated
- [ ] Compaction standard: 97% heavy Proctor specified
- [ ] Subgrade thickness: top 500 mm confirmed

### C. Sub-Base

- [ ] GSB minimum thickness: drainage layer ≥ 100 mm, filter ≥ 100 mm (or combined ≥ 150 mm)
- [ ] GSB thickness checked for construction traffic or 10,000 SA (whichever more)
- [ ] GSB gradation specified (MoRTH drainage / filter gradation cited)
- [ ] If CTSB: thickness ≥ 200 mm; 7-day UCS 1.5–3.0 MPa specified
- [ ] CTSB design modulus: 600 MPa (standard) or 400 MPa (lower strength)
- [ ] CTSB curing: ≥ 3 days (or 7 days if strength criterion)

### D. Base

- [ ] Granular base minimum thickness ≥ 150 mm
- [ ] If CTB: minimum thickness ≥ 100 mm; UCS 4.5–7 MPa in 7/28 days
- [ ] CTB lab strength ≥ 1.5 × required field strength
- [ ] CTB design modulus: 5000 MPa
- [ ] CTB curing: ≥ 7 days with immediate curing start
- [ ] If CTB: crack relief layer mandatorily provided (100 mm WMM or SAMI)
- [ ] CTB flexural strength / modulus of rupture calculated and stated
- [ ] CTB durability criterion (≤ 14% weight loss, BIS:4332 Part-IV) specified
- [ ] RF factor for CTB fatigue check correctly applied (1 or 2 per Section 3.6.3)

### E. Bituminous Layers

- [ ] Binder grade and mix type correct for design traffic level per Table 9.1
- [ ] Expressways/NHs: VG40 (min 3600 Poise @ 60°C) or modified bitumen specified
- [ ] DBM rich bottom layer: target air void and VFB specified; field compaction target stated
- [ ] Minimum bituminous layer thickness: ≥ 100 mm (combined) for CTB pavements > 20 msa
- [ ] Resilient modulus: tested value or Table 9.2 value (lesser adopted); test at 35°C per ASTM:4123
- [ ] V_a and V_be stated for fatigue calculations (Equations 3.3/3.4)

### F. Structural Analysis

- [ ] IITPAVE software used for analysis (or equivalent linear elastic program)
- [ ] Standard axle: 80 kN, dual wheels, 20 kN each, 310 mm spacing confirmed
- [ ] Contact pressure: 0.56 MPa (general); 0.80 MPa (CTB fatigue)
- [ ] Layer interface: fully bonded assumed and confirmed
- [ ] Reliability level correct for road category and traffic (80% or 90%) per Section 3.7
- [ ] Computed ε_v ≤ allowable from Equation 3.1 or 3.2 (correct reliability)
- [ ] Computed ε_t ≤ allowable from Equation 3.3 or 3.4 (correct reliability)
- [ ] CTB fatigue check: N from Equation 3.5 ≥ design traffic
- [ ] CTB CFD check: Σ(n_i/N_fi) < 1.0 (if axle load spectrum available)
- [ ] All layer modulus and Poisson's ratio values per Table 11.1

### G. Frost / Special Areas

- [ ] Frost-affected area identified; total pavement thickness ≥ 450 mm confirmed
- [ ] Frost-resistant materials specified for subgrade and base/sub-base

### H. Quality Control

- [ ] QC test schedule per Section 14 included in DPR
- [ ] Test frequencies for bituminous, CTB/CTSB, emulsion/foam layers specified
- [ ] Resilient modulus QC test for bituminous layers specified

### I. General DPR Completeness

- [ ] Design traffic stated in msa
- [ ] All layer thicknesses explicitly stated
- [ ] Pavement composition type (catalogue category a–f or analytical) identified
- [ ] Material properties for each layer tabulated
- [ ] Site-specific IITPAVE analysis report attached (mandatory for traffic > 2 msa)
- [ ] Stage construction: base/sub-base designed for full period; CTB/CTSB stage construction ruled out
- [ ] If stage construction: Stage-1 design traffic = 1.67 × Stage-1 period traffic

---

## 14. KEY REFERENCES (IRC:37-2018 Section 15)

| Ref | Standard | Purpose |
|---|---|---|
| IRC:9 | Traffic Census on Non-Urban Roads | Traffic count method |
| IRC:81 | BBD Technique | Overlay/rehabilitation |
| IRC:108 | Traffic Prediction for Rural Highways | Growth rate estimation |
| IRC:115 | FWD Technique | Overlay/rehabilitation |
| IRC:SP:59 | Geotextiles in Road Pavements | Geosynthetic use |
| IRC:SP:72 | Flexible Pavements for Low Volume Rural Roads | Traffic < 2 msa |
| IRC:SP:89 | Soil/Granular Material Stabilisation | CTB/CTSB mix design |
| IS:2720 Part-8 | Heavy Compaction | Subgrade compaction standard |
| IS:2720 Part-16 | Laboratory CBR | CBR test method |
| BIS:4332 Part-IV | Wetting/Drying, Freeze-Thaw Tests | CTB durability |
| ASTM:4123 / D7369 | Resilient Modulus of Bituminous Mixes | Mix modulus test |
| ASTM:D6931 | IDT Strength of Asphalt | ITS test for RAP mixes |
| AASHTO T307-99 | Resilient Modulus of Soils | Subgrade Mr test |
| MoRTH Specs 2013 | Specifications for Road & Bridge Works | Material/construction specs |

---

*End of IRC:37-2018 structured extraction. For DPR Analyzer Pro internal use.*
