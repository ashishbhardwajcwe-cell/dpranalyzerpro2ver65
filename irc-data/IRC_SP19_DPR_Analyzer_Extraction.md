# IRC:SP:19-2001 — Structured Extraction for DPR Analyzer Pro
**Manual for Survey, Investigation and Preparation of Road Projects**
*Indian Roads Congress, Second Revision 2001*

> **Scope of this extraction:** Mandatory requirements, checklists, data formats, and compliance criteria only. Theory, derivations, and worked examples excluded.

---

## MODULE 1 — PROJECT INITIATION & SCOPE DEFINITION

### 1.1 Mandatory Pre-Survey Requirements

| Item | Requirement | Compliance Trigger |
|------|-------------|-------------------|
| Project sanctioning authority | Identified and documented | DPR must cite sanctioning authority |
| Administrative approval | Obtained before survey commencement | AA letter reference mandatory |
| Technical sanction authority | Identified per cost threshold | Cost → authority matrix followed |
| Scope of work document | Prepared and approved | Must precede field surveys |
| Survey team composition | As per competency norms | Team credentials documented |

### 1.2 Classification of Road Projects Requiring DPR

| Project Type | DPR Requirement | Survey Depth |
|---|---|---|
| New road construction | Full DPR mandatory | Detailed |
| Upgradation (single to double lane) | Full DPR mandatory | Detailed |
| Strengthening of existing road | Short DPR / feasibility | Moderate |
| Bypass / new alignment | Full DPR mandatory | Detailed |
| Bridge/culvert on existing road | Structure-specific DPR | Focused |
| BRO/PWD rural connectivity | Full DPR mandatory | Detailed |

---

## MODULE 2 — SURVEY REQUIREMENTS (MANDATORY)

### 2.1 Reconnaissance Survey — Mandatory Outputs

**Must be included in DPR:**
- [ ] Route/alignment options studied (minimum 2 alternatives)
- [ ] Terrain classification along each alignment
- [ ] Major obstacles/constraints identified (rivers, hills, forests, habitations)
- [ ] Approximate quantities estimated for each alternative
- [ ] Recommended alignment with justification
- [ ] Approximate project cost for each alternative
- [ ] Socio-economic justification for recommended alignment

### 2.2 Preliminary Survey — Mandatory Outputs

**Instrument/method requirements:**
- Theodolite/Total Station traverse along selected alignment
- Longitudinal section at intervals not exceeding **50 m** (plain/rolling) or **20 m** (hilly/steep)
- Cross-sections at intervals not exceeding **50 m** (P/R) or **20 m** (H/S)
- Cross-section width: Formation width + **5 m** each side minimum

**Must be included in DPR:**
- [ ] Traverse survey data (bearings, distances)
- [ ] Benchmark references (minimum 2 TBMs per km)
- [ ] Longitudinal profile plotted to standard scales
- [ ] Cross-sections at specified intervals
- [ ] Contour plan of alignment corridor (scale 1:1000 to 1:5000)
- [ ] Catchment area delineation at all drainage crossings
- [ ] Soil investigation preliminary report
- [ ] Traffic census data (as per Cl. 5 requirements)

### 2.3 Detailed Survey — Mandatory Outputs

**Instrument requirements:**
- Total Station / GPS-based survey mandatory for projects > ₹5 Cr (recommended for all)
- Aerial photogrammetry permissible for alignments > 25 km

**Plans required in DPR:**

| Plan Type | Scale | Mandatory Content |
|---|---|---|
| Key plan | 1:50,000 or 1:25,000 | Alignment, district boundaries, railheads |
| Index plan | 1:10,000 | Villages, roads, drainage |
| Alignment/L-section plan | H: 1:1000, V: 1:100 | Gradient, curves, structures |
| Cross-section sheets | H: 1:100 | Cut/fill, formation, slopes |
| Structure site plan | 1:500 to 1:100 | For each bridge/major culvert |
| Land acquisition plan | 1:1000 | Width, boundary, ownership |

---

## MODULE 3 — TRAFFIC DATA (MANDATORY)

### 3.1 Traffic Count Requirements

| Survey Type | Duration | Mandatory |
|---|---|---|
| Classified Volume Count | 7 days × 24 hours | Yes |
| Origin-Destination Survey | As per project type | For new alignments |
| Axle Load Survey | Minimum 48 hours | Yes for design |
| Speed & Delay Study | As required | For upgradation projects |

**Vehicle Classification (IRC standard 7 categories):**

| Class | Vehicle Type |
|---|---|
| 1 | Two-wheelers |
| 2 | Three-wheelers / Auto-rickshaw |
| 3 | Cars, Jeeps, Vans |
| 4 | Light Commercial Vehicles (LCV) |
| 5 | Bus |
| 6 | 2-axle trucks |
| 7 | Multi-axle trucks / MAV |

### 3.2 Traffic Projection — Mandatory Parameters

**Design Life:** 20 years from year of construction

**Growth Rates to be applied:**

| Traffic Category | Source for Growth Rate |
|---|---|
| Passenger vehicles | State/National GDP growth data |
| Commercial vehicles | Freight growth indices |
| Agriculture traffic | District agricultural output data |

**Formula for Design Traffic (MSA):**

```
N = 365 × A × {[(1+r)^n - 1] / r}

Where:
N  = Cumulative standard axles (MSA)
A  = Initial daily traffic (CVPD in terms of standard axles)
r  = Annual growth rate (decimal)
n  = Design life (years)
```

**Mandatory in DPR:**
- [ ] Base year traffic count (7-day classified)
- [ ] Directional distribution stated
- [ ] Vehicle damage factor (VDF) per vehicle class — as per IRC:37
- [ ] Design lane traffic computed
- [ ] Design traffic in MSA stated explicitly
- [ ] Growth rate with source cited

---

## MODULE 4 — GEOMETRIC DESIGN STANDARDS (MANDATORY)

### 4.1 Road Classification & Design Standards

| Road Class | Design Speed (km/h) | Min Radius (m) | Max Gradient (%) |
|---|---|---|---|
| National Highway (Plain) | 100 | 360 | 3.3 |
| National Highway (Rolling) | 80 | 230 | 5.0 |
| National Highway (Hilly) | 50 | 90 | 6.0 |
| State Highway (Plain) | 80 | 230 | 4.0 |
| State Highway (Rolling) | 65 | 155 | 5.0 |
| State Highway (Hilly) | 40 | 60 | 7.0 |
| MDR (Plain) | 65 | 155 | 5.0 |
| MDR (Rolling) | 50 | 90 | 6.0 |
| MDR (Hilly) | 40 | 60 | 7.0 |
| ODR / VR (Plain/Rolling) | 50 | 90 | 7.0 |
| ODR / VR (Hilly) | 40 | 60 | 8.0 (BRO: 10%) |

### 4.2 Cross-Section Elements — Mandatory Dimensions

**Formation Width (m):**

| Road Type | Plain/Rolling | Hilly/Steep |
|---|---|---|
| NH (4-lane) | 60.0 | — |
| NH (2-lane) | 12.0 | 8.5 |
| SH / MDR (2-lane) | 11.0 | 7.5 |
| MDR (Intermediate) | 9.0 | 6.5 |
| ODR | 7.5 | 6.0 |
| Village Road | 6.5 | — |

**Carriageway Width:**

| Road Type | 2-lane (m) | Intermediate (m) | Single Lane (m) |
|---|---|---|---|
| NH | 7.0 | — | — |
| SH / MDR | 7.0 | 5.5 | 3.75 |
| ODR | 5.5 | — | 3.75 |
| VR | — | — | 3.0 |

**Shoulders:**

| Road Type | Paved (m) | Earthen (m) | Total (m) |
|---|---|---|---|
| NH (Plain) | 1.5 each side | 1.0 | 2.5 each side |
| NH (Hilly) | — | 1.0 each side | 1.0 |
| SH/MDR | 1.0 | 0.5 to 1.0 | — |

**Side Slopes:**

| Material | Cut Slope | Embankment Slope |
|---|---|---|
| Soft rock | 1:4 (H:V) min | — |
| Hard rock | Near vertical | — |
| Ordinary soil (H < 3m) | 1:1 | 2:1 |
| Ordinary soil (H 3–6m) | 1:1 | 2:1 benched |
| Ordinary soil (H > 6m) | Stepped | Stepped |

### 4.3 Horizontal Curve Requirements

**Mandatory elements to be computed and shown in DPR:**
- [ ] Design speed adopted
- [ ] Minimum radius provided (≥ table value)
- [ ] Superelevation rate (max 7% plain, 10% hilly)
- [ ] Transition/spiral length provided
- [ ] Extra widening on curves (as per IRC:38)
- [ ] Sight distance checked (SSD / OSD / ISD)

**Superelevation Formula:**
```
e + f = V² / (127 × R)

Where:
e = superelevation (decimal)
f = lateral friction coefficient (0.15 for V≤80, 0.12 for V>80)
V = design speed (km/h)
R = radius of curve (m)
```

**Transition Length (Ls):**
```
Ls = (e_f × N × W)   [rate-of-change of superelevation method]
Ls = 0.036 × V³ / R  [minimum desirable]

Where:
e_f = final superelevation (decimal)
N   = rate of change (1 in 150 plain; 1 in 60 hilly)
W   = total carriageway width (m)
```

---

## MODULE 5 — PAVEMENT DESIGN (MANDATORY DATA IN DPR)

### 5.1 Soil Investigation Requirements

**Mandatory borings/pits:**

| Terrain | Spacing of Test Pits | Depth |
|---|---|---|
| Plain/Rolling | 500 m intervals | 1.5–2.0 m |
| Hilly | 250 m intervals | 1.5 m |
| At structure sites | At each foundation | As per design |
| At problematic soil zones | Additional as required | Up to 3.0 m |

**Mandatory tests per soil horizon:**

| Test | Standard | Mandatory |
|---|---|---|
| Grain size analysis | IS:2720 (Part 4) | Yes |
| Atterberg limits (LL, PL, PI) | IS:2720 (Part 5) | Yes |
| Proctor compaction (OMC, MDD) | IS:2720 (Part 7/8) | Yes |
| CBR (soaked, 4 days) | IS:2720 (Part 16) | Yes |
| Free swell index | IS:2720 (Part 40) | If expansive soil suspected |

**Design CBR:** Use 90th percentile (P10) value or mean minus one sigma — whichever is lower.

### 5.2 Pavement Design Reference

Pavement thickness design per **IRC:37** (flexible) or **IRC:58** (rigid) — refer respective extraction documents.

**DPR must state:**
- [ ] Subgrade CBR value (design value, not test value)
- [ ] Design traffic (N in MSA)
- [ ] Type of pavement selected (flexible / rigid / composite) with justification
- [ ] Pavement crust composition with layer thicknesses
- [ ] Source of design chart/catalogue reference

---

## MODULE 6 — DRAINAGE DESIGN (MANDATORY)

### 6.1 Hydraulic Data Required

**For every drainage structure, DPR must include:**
- [ ] Catchment area (km²) delineated on topo map
- [ ] Highest Flood Level (HFL) — from local records / survey
- [ ] Design discharge computed (Q in m³/s)
- [ ] Design return period stated

**Return Period Standards:**

| Structure Type | Return Period |
|---|---|
| Culverts (minor) | 25 years |
| Bridges (major) | 50 years |
| Bridges (NH/SH) | 100 years |
| Causeways / Irish crossing | 25 years |
| Road drainage (side drains) | 10 years |

### 6.2 Discharge Calculation — Mandatory Formula

**Rational Formula (for catchment < 50 km²):**
```
Q = (1/3.6) × C × I × A

Where:
Q = peak discharge (m³/s)
C = runoff coefficient (table below)
I = rainfall intensity (mm/hr) for Tc duration, T-year return period
A = catchment area (km²)
Tc = time of concentration (hours)
```

**Time of Concentration:**
```
Tc = (0.87 × L³ / H)^0.385   [Kirpich formula]

Where:
L = length of longest watercourse (km)
H = difference in elevation between outlet and most remote point (m)
```

**Runoff Coefficient (C):**

| Land Cover | C Value |
|---|---|
| Steep, rocky, impermeable | 0.70 – 0.90 |
| Hilly with sparse vegetation | 0.50 – 0.75 |
| Rolling, cultivated | 0.35 – 0.50 |
| Flat, cultivated | 0.25 – 0.40 |
| Forest / heavy vegetation | 0.10 – 0.30 |
| Urban / paved | 0.70 – 0.90 |

**Dickens Formula (India-specific, for medium catchments):**
```
Q = C_d × M^(3/4)

Where:
C_d = Dickens constant (6–30, region-specific)
M   = catchment area (km²)
```

### 6.3 Drainage Structure Requirements

**Side drains:** Mandatory on all roads. Trapezoidal preferred; lined in hilly terrain.

**Culverts:** Required wherever natural drainage crosses alignment.
- Slab culvert: span ≤ 6 m
- Box culvert: where road width demands or debris expected
- Pipe culvert: only for minor crossings, discharge < 0.3 m³/s

**DPR must list all drainage structures in a schedule including:**
- [ ] Chainage location
- [ ] Type and span
- [ ] Design discharge
- [ ] HFL and waterway adequacy
- [ ] Scour depth calculated
- [ ] Foundation type

---

## MODULE 7 — BRIDGE & CULVERT INVESTIGATIONS (MANDATORY)

### 7.1 Site Investigation Checklist

**For each proposed bridge/major culvert, DPR must contain:**
- [ ] Site plan (scale 1:500) with north arrow and HFL marked
- [ ] Cross-section of stream at bridge site (minimum 3 sections: at site, 50 m U/S, 50 m D/S)
- [ ] HFL established from field evidence / gauge records
- [ ] Discharge data (measured or computed)
- [ ] Scour depth calculation
- [ ] Bore logs at proposed pier/abutment locations (minimum 2)
- [ ] Soil / rock classification at foundation level
- [ ] Type and span arrangement recommended
- [ ] Skew angle if applicable
- [ ] Approach road data (gradient, curves within 50 m)

### 7.2 Scour Depth — Mandatory Formula

**Mean Scour Depth (Lacey's formula):**
```
dsm = 0.473 × (Q/f)^(1/3)

Where:
dsm = mean scour depth below HFL (m)
Q   = design discharge (m³/s)
f   = Lacey's silt factor = 1.76 × √(d50)
d50 = median grain size (mm)
```

**Maximum Scour Depth:**
```
dmax = 1.27 × dsm (for piers)
dmax = 1.50 × dsm (abutments in bends)
dmax = 2.00 × dsm (noses of guide bunds)
```

**Foundation depth** = HFL − dmax − minimum 1.0 m (soft rock) to 1.5 m (soil)

---

## MODULE 8 — LAND ACQUISITION & UTILITY SHIFTING (MANDATORY)

### 8.1 Land Acquisition Data Required in DPR

**LA Schedule must include:**
- [ ] Village/Khasra-wise land area to be acquired (ha)
- [ ] Land classification (agricultural / forest / government / private)
- [ ] Number of trees to be felled (species-wise)
- [ ] Number of structures to be demolished (type and count)
- [ ] Number of Project Affected Families (PAFs)
- [ ] Land value (circle rate) and estimated LA cost
- [ ] Forest area (if any) — Stage I FC clearance status

### 8.2 Utility Shifting Requirements

**DPR must identify and estimate cost for:**
- [ ] Overhead power lines (HT/LT) — coordination agency identified
- [ ] Underground cables / pipelines
- [ ] Water supply lines
- [ ] Telephone / optical fibre cables
- [ ] Railway level crossings (if applicable)

---

## MODULE 9 — ENVIRONMENTAL & SOCIAL REQUIREMENTS

### 9.1 Environmental Checklist (Mandatory in DPR)

| Item | Requirement |
|---|---|
| Forest land involvement | Forest Clearance (FC) status / application |
| Wildlife sanctuary proximity | Wildlife clearance required if within 10 km |
| Environmental Sensitive Areas | Identified and listed |
| Borrow areas | Location, quantity, environmental condition |
| Quarry sites | Location, approvals, haul distance |
| Spoil disposal sites | Identified with area and capacity |
| Pollution control measures | Listed for construction phase |

### 9.2 Social Impact

**DPR must include:**
- [ ] Social Impact Assessment (SIA) if > 100 families affected
- [ ] Resettlement & Rehabilitation (R&R) plan outline
- [ ] Vulnerable group identification

---

## MODULE 10 — COST ESTIMATION (MANDATORY FORMAT)

### 10.1 Abstract Estimate — Mandatory Heads

| Head | Sub-heads |
|---|---|
| A — Earthwork | Cutting, embankment, disposal |
| B — Pavement | Sub-base, base, binder, wearing course |
| C — Drainage | Side drains, culverts, slope protection |
| D — Bridges | Each structure separately |
| E — Traffic safety | Signs, markings, crash barriers, km posts |
| F — Land acquisition | As per LA schedule |
| G — Utility shifting | As per utility schedule |
| H — Environmental measures | As per EMP |
| I — Contingency | 3–5% of A to H |
| J — Establishment / overheads | As per department norms |

### 10.2 Rate Schedule Requirements

- [ ] DSR (District Schedule of Rates) of the relevant year cited
- [ ] Non-DSR items: market rate analysis included
- [ ] Lead/lift charges computed for quarry materials
- [ ] GST / taxes included separately
- [ ] Escalation provision stated (if multi-year project)

---

## MODULE 11 — DPR DOCUMENT STRUCTURE (MANDATORY CHAPTERS)

A compliant DPR must contain the following chapters/volumes:

| Chapter | Content | Mandatory |
|---|---|---|
| 1 | Introduction and project background | Yes |
| 2 | Existing road details and condition | Yes |
| 3 | Survey data (reconnaissance + detailed) | Yes |
| 4 | Traffic data and design traffic | Yes |
| 5 | Geometric design and alignment | Yes |
| 6 | Pavement design | Yes |
| 7 | Drainage design | Yes |
| 8 | Bridge / structure design | Yes (if applicable) |
| 9 | Land acquisition schedule | Yes |
| 10 | Environmental management plan | Yes |
| 11 | Cost estimate (abstract + detailed) | Yes |
| 12 | Economic analysis (NPV / BCR / IRR) | Yes for NH/SH |
| Drawings volume | All plans, L-sections, X-sections, structures | Yes |
| Annexures | Soil reports, traffic counts, clearances | Yes |

---

## MODULE 12 — ECONOMIC ANALYSIS (MANDATORY FOR NH/SH/MAJOR PROJECTS)

### 12.1 Required Economic Indicators

| Indicator | Threshold for Viability |
|---|---|
| Net Present Value (NPV) | > 0 (positive) |
| Benefit-Cost Ratio (BCR) | ≥ 1.5 (desirable ≥ 2.0) |
| Internal Rate of Return (IRR) | ≥ 12% (minimum); ≥ 15% desirable |
| Payback Period | Cited (informational) |

**Discount rate:** 12% (standard for MoRTH/IRC projects)

**Benefits to be quantified:**
- [ ] Vehicle Operating Cost (VOC) savings — per HDM-4 or MoRTH VOC tables
- [ ] Time savings (passengers + freight)
- [ ] Accident cost savings (if safety improvement component)
- [ ] Development benefits (qualitative statement)

**Project life for analysis:** 20 years

---

## DPR COMPLIANCE CHECKLIST — IRC:SP:19 (Quick Reference)

### SECTION A — SURVEYS & INVESTIGATIONS
- [ ] A1. Route alternatives studied (≥ 2 options, comparative statement)
- [ ] A2. Reconnaissance report with terrain classification
- [ ] A3. Detailed survey with total station / GPS
- [ ] A4. Longitudinal section at required intervals (50 m P/R, 20 m hilly)
- [ ] A5. Cross-sections at required intervals with adequate width
- [ ] A6. Contour plan of corridor provided
- [ ] A7. TBMs established (min. 2 per km) and referenced
- [ ] A8. Soil investigation pits at specified spacing with test results
- [ ] A9. Hydrological catchment delineated for all crossings

### SECTION B — TRAFFIC
- [ ] B1. 7-day classified traffic count included
- [ ] B2. Vehicle Damage Factor (VDF) applied per vehicle class
- [ ] B3. Design traffic in MSA computed with formula shown
- [ ] B4. Growth rate cited with data source
- [ ] B5. Design period stated (20 years)

### SECTION C — GEOMETRIC DESIGN
- [ ] C1. Design speed as per road classification
- [ ] C2. All horizontal curves with radius ≥ minimum (tabulated)
- [ ] C3. Superelevation rates computed and within limits
- [ ] C4. Transition lengths provided at all curves
- [ ] C5. Sight distances checked (SSD at minimum)
- [ ] C6. Maximum gradient within prescribed limits
- [ ] C7. Cross-section elements as per standards (formation width, shoulder width)

### SECTION D — PAVEMENT
- [ ] D1. Design CBR (90th percentile, soaked) stated
- [ ] D2. Pavement type justified
- [ ] D3. Crust composition per IRC:37 / IRC:58
- [ ] D4. Layer thicknesses stated

### SECTION E — DRAINAGE
- [ ] E1. Side drains designed for all reaches
- [ ] E2. Catchment area computed for every structure
- [ ] E3. Design discharge computed (Rational / Dickens formula)
- [ ] E4. Return period stated per structure type
- [ ] E5. HFL established at each crossing
- [ ] E6. Structure type and waterway adequacy verified
- [ ] E7. Complete drainage structure schedule in DPR

### SECTION F — BRIDGES & MAJOR STRUCTURES
- [ ] F1. Site plan at 1:500 with HFL marked
- [ ] F2. Stream cross-sections (3 minimum per site)
- [ ] F3. Scour depth computed (Lacey's formula)
- [ ] F4. Foundation depth derived from scour depth
- [ ] F5. Bore log data at foundation locations
- [ ] F6. Span arrangement provided

### SECTION G — LAND ACQUISITION & UTILITIES
- [ ] G1. LA schedule village/khasra-wise
- [ ] G2. Forest land identified; FC clearance status stated
- [ ] G3. Trees and structures to be affected counted
- [ ] G4. Utility shifting identified and costed

### SECTION H — COST ESTIMATE
- [ ] H1. Estimate under mandatory heads A through J
- [ ] H2. DSR reference cited (year and edition)
- [ ] H3. Non-DSR item analysis sheets included
- [ ] H4. LA cost as per schedule
- [ ] H5. Utility shifting cost estimated
- [ ] H6. Contingency provision (3–5%)

### SECTION I — ECONOMIC ANALYSIS (NH/SH)
- [ ] I1. BCR ≥ 1.5 computed at 12% discount rate
- [ ] I2. IRR ≥ 12% established
- [ ] I3. NPV positive confirmed
- [ ] I4. Analysis period = 20 years
- [ ] I5. VOC savings computed per MoRTH/HDM tables

### SECTION J — DRAWINGS & DOCUMENTS
- [ ] J1. Key plan included
- [ ] J2. Index plan included
- [ ] J3. Alignment plan with L-section
- [ ] J4. Cross-section sheets complete
- [ ] J5. Structure drawings (site plan, general arrangement)
- [ ] J6. LA plan (1:1000 scale)
- [ ] J7. Soil investigation report as annexure
- [ ] J8. Traffic count data as annexure
- [ ] J9. Environmental management plan

---

## CRITICAL DEFICIENCIES (Auto-flag in DPR Analyzer)

The following omissions make a DPR **non-compliant** regardless of other content:

| # | Critical Item | IRC Reference |
|---|---|---|
| CR-1 | Design traffic (MSA) not computed or formula absent | Cl. 5 |
| CR-2 | CBR value not stated or not soaked/4-day | Cl. 6 |
| CR-3 | Horizontal curve radius below minimum without deviation approval | Cl. 4 |
| CR-4 | No HFL established for bridge/major culvert | Cl. 7 |
| CR-5 | Scour depth not computed for bridge foundations | Cl. 7 |
| CR-6 | No drainage structure schedule | Cl. 8 |
| CR-7 | LA schedule absent or forest land not identified | Cl. 9 |
| CR-8 | Cost estimate without DSR reference | Cl. 10 |
| CR-9 | No soil investigation data | Cl. 6 |
| CR-10 | Design speed not stated / not matching road classification | Cl. 4 |

---

*Extraction prepared for DPR Analyzer Pro — IRC:SP:19-2001 compliance module*
*Cross-reference: IRC:37 (flexible pavement), IRC:58 (rigid pavement), IRC:6 (loads), IRC:38 (geometric design), IRC:5 (bridges)*
