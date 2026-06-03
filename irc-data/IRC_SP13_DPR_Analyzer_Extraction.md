# IRC:SP:13 — Guidelines for the Design of Small Bridges and Culverts
**Indian Roads Congress Special Publication 13 (1998)**
*Structured Extraction for DPR Analyzer Pro — Mandatory Requirements, Design Tables, Formulas & Compliance Checklist*

---

## SCOPE

Applies to **small bridges and culverts** on road projects. For larger/major bridges, IRC Standard Specifications & Code of Practice for Road Bridges (Section I, Clauses 100–102) shall be followed.

---

## PART A: MANDATORY REQUIREMENTS BY ARTICLE

---

### ARTICLE 1 — SITE INSPECTION

**Mandatory Site Selection Criteria:**
1. Site shall be on a **straight reach** of stream, sufficiently below bends
2. Site shall be **away from confluence** of large tributaries (beyond their disturbing influence)
3. Site shall have **well-defined banks**
4. Site shall make **approach roads feasible on the straight**
5. Site shall offer a **square (90°) crossing** as far as possible

**Mandatory Inspection Data to Record:**
- Maximum flood level marks
- Afflux observed at existing nearby structures
- Tendency to scour
- Probable maximum discharge
- Likelihood of brushwood collection during floods
- Silt factor and coefficient of rugosity from channel conditions
- Existing structure defects (too large / too small / structural defects)

> **Note:** Approach alignment shall essentially govern site selection unless bridge design issues override.

---

### ARTICLE 2 — THE ESSENTIAL DESIGN DATA

**Mandatory Data to Collect:**

**2.2 Catchment Area**
- Area < 1.25 sq km: traverse along watershed with chain and compass
- Larger areas: read from 1 cm = 500 m topo maps (Survey of India)

**2.3 Cross-Sections** — Minimum number required:

| Catchment Area | Distance u/s & d/s at which cross-sections shall be taken |
|---|---|
| Up to 2.5 sq km | 150 m |
| 2.5 to 10 sq km | 300 m |
| Over 10 sq km | 400 m to 1600 m |

**(Table 1 of IRC:SP:13)**

- Cross-section scale: horizontal not less than 1 cm = 10 m (i.e., 1/1000); vertical not less than 1 cm = 1 m (i.e., 1/100)
- For very small streams (catchment ≤ 40 ha): one cross-section may suffice if it truly represents normal channel

**2.5 Maximum HFL** — Shall be ascertained by intelligent local observation + local enquiry; marked on cross-sections

**2.6 Longitudinal Section** — Shall extend u/s and d/s to distances per Table 1; shall show bed level, low water surface, and HFL

**2.7 Velocity Observation** — Velocity observation during actual flood is mandatory if possible; observed velocity to be suitably increased if flood observed is smaller than the maximum

**2.8 Trial Pit Sections**
- Where rock/firm undisturbed soil may be near alluvial bed: trial pit shall be dug to rock or firm soil
- If no rock: trial pit may be taken to roughly **twice the maximum anticipated scour depth**
- Location of each trial pit shall be shown on the cross-section of proposed site

**2.10 Conclusion (Mandatory):**
> "No satisfactory designing can be done unless the minimum essential design data listed above are collected and recorded."

---

### ARTICLE 3 — EMPIRICAL FORMULAE FOR PEAK RUN-OFF FROM CATCHMENT

**3.2 Dickens' Formula**

$$Q = C M^{3/4} \quad ...(3.2)$$

Where:
- Q = peak run-off in cu.m/sec
- M = catchment area in sq.km
- C = 11–14 (annual rainfall 60–120 cm); 14–19 (Madhya Pradesh); 22 (Western Ghats)

**3.3 Ryve's Formula** *(for Madras region)*

$$Q = C M^{2/3} \quad ...(3.3)$$

Where:
- C = 6.8 (within 25 km of coast); 8.5 (25–160 km from coast); 10.0 (limited areas near hills)

**3.4 Inglis' Formula** *(for Bombay Presidency)*

$$Q = \frac{125\,M}{\sqrt{M+10}}$$

Where Q = maximum flood discharge in cu.m/sec; M = catchment area in sq.km

> **Mandatory Note:** These empirical formulae involve only catchment area. They are an extreme simplification and cannot be expected to yield accurate results. They shall be used only in absence of better data.

---

### ARTICLE 4 — RATIONAL FORMULAE FOR PEAK RUN-OFF FROM CATCHMENT

**4.3 Intensity-Duration Relationship**

$$\frac{i}{I} = \frac{T+1}{t+1} \quad \Rightarrow \quad i = I \cdot \left(\frac{T+1}{t+1}\right) \quad ...(4.3a)$$

$$i = \frac{F}{T} \cdot \left(\frac{T+1}{t+1}\right) \quad ...(4.3b)$$

Where: i = intensity in time interval t; I = mean intensity over storm duration T; F = total precipitation (cm); T = storm duration (hours); t = sub-interval (hours); c = 1 (for t in hours, F in cm)

**4.5 One-Hour Rainfall for Region (I₀)**

$$I_0 = \frac{F}{2}\left(1 + \frac{1}{T}\right) \quad ...(4.5)$$

**4.7 Time of Concentration (tc)**

$$t_c = \left(0.87 \times \frac{L^3}{H}\right)^{0.385} \quad ...(4.7)$$

Where:
- tc = concentration time in hours
- L = distance from critical point to culvert in km
- H = fall in level from critical point to culvert in metres

**4.8 Critical Intensity (Ic)**

$$I_c = \frac{F}{T}\left(\frac{T+1}{t_c+1}\right) \quad ...(4.8a)$$

$$I_c = I_0\left(\frac{2}{t_c+1}\right) \quad ...(4.8b)$$

**4.9 Design Run-off (Rational Formula)**

$$Q = 0.028 \cdot P \cdot A \cdot I_c \quad ...(4.9)$$

Where:
- Q = max. run-off in cu.m/sec
- A = area of catchment in hectares
- Ic = critical intensity of rainfall in cm/hour
- P = percentage coefficient of run-off for the catchment

**Table 2 — Maximum Value of P in Formula Q = 0.028 PAIc**

| Catchment Characteristic | P (max) |
|---|---|
| Steep, bare rock; also city pavements | 0.90 |
| Rock, steep but wooded | 0.80 |
| Plateaus, lightly covered | 0.70 |
| Clayey soils, stiff and bare | 0.60 |
| Clayey soils, lightly covered | 0.50 |
| Loam, lightly cultivated or covered | 0.40 |
| Loam, largely cultivated | 0.30 |
| Sandy soil, light growth | 0.20 |
| Sandy soil, covered, heavy brush | 0.10 |

**(Table 2 of IRC:SP:13)**

**4.14 Run-off for Small Catchments (≤ 15 sq.km / 1500 ha)**

$$Q = P \cdot A \left(\frac{0.056}{t_c + 1}\right) \quad ...(4.14)$$

*(For I₀ = 1 cm; multiply result by actual I₀ of region)*

---

### ARTICLE 5 — ESTIMATING FLOOD DISCHARGE FROM CONVEYANCE FACTOR AND SLOPE OF STREAM

**5.4 Manning's Formula**

$$V = \frac{R^{2/3} \cdot S^{1/2}}{n} \quad ...(5.4a)$$

Where:
- V = velocity in m/sec
- R = hydraulic mean depth = A/P (m)
- S = energy slope (≈ bed slope for uniform flow)
- n = rugosity coefficient

**Table 3 — Rugosity Coefficient 'n'**

| Surface | Perfect | Good | Fair | Bad |
|---|---|---|---|---|
| Natural Streams | | | | |
| Clean, straight bank, full stage, no rifts/deep pools | 0.025 | 0.0275 | 0.030 | 0.033 |
| Same as (1), with some weeds and stones | 0.030 | 0.033 | 0.035 | 0.040 |
| Winding, some pools and shoals, clean | 0.035 | 0.040 | 0.045 | 0.050 |
| Same as (3), lower stages, more ineffective slope | 0.040 | 0.045 | 0.050 | 0.055 |
| Same as (3), some weeds and stones | 0.033 | 0.035 | 0.040 | 0.045 |
| Same as (4), stony sections | 0.045 | 0.050 | 0.055 | 0.060 |
| Sluggish river reaches, weedy/deep pools | 0.050 | 0.060 | 0.070 | 0.080 |
| Very weedy reaches | 0.075 | 0.100 | 0.125 | 0.150 |

**(Table 3 of IRC:SP:13)**

**5.5 Discharge Calculation**

$$Q = A \cdot V = \frac{A \cdot R^{2/3} \cdot S^{1/2}}{n} \quad ...(5.5)$$

$$Q = \lambda \cdot S^{1/2} \quad ...(5.6) \quad \text{where } \lambda = \frac{A \cdot R^{2/3}}{n} \text{ (Conveyance Factor)}$$

---

### ARTICLE 6 — ESTIMATING FLOOD DISCHARGE FROM FLOOD MARKS ON EXISTING STRUCTURE

*Method:* Measure u/s HFL and d/s depth at existing structure → apply Orifice Formula or Weir Formula per Article 17. Cross-check with discharge computed by Area-Velocity method.

---

### ARTICLE 7 — FIXING DESIGN DISCHARGE

**7.1 Mandatory Rule:**
- Estimate Q by at least **two independent methods** (Articles 3/4 and 5/6)
- Compare values obtained
- **Adopt the highest value** as design discharge Q, provided it does not exceed the next highest value by more than **50 per cent**
- If it exceeds by more than 50%, restrict Q to 150% of the next highest value

**7.2 Design Return Period:**
- Small bridges: once in **20 years**
- Big bridges: once in **100 years**

**7.3** For small culverts: Q may be taken as discharge from the run-off formulae directly.

---

### ARTICLE 8 — ALLUVIAL STREAMS — LACEY'S EQUATIONS

**8.4 Lacey's Regime Equations**

**(a) Regime Cross-Section:**

$$P = 4.8\,Q^{1/2} \quad ...(8.4a)$$

$$R = \frac{0.473\,Q^{1/3}}{f^{1/3}} \quad ...(8.4b)$$

$$S = \frac{0.0003 \cdot f^{5/3}}{Q^{1/6}} \quad ...(8.4c)$$

**(b) Regime Velocity and Area:**

$$V = 0.44\,Q^{1/3} \times f^{1/3} \quad ...(8.4d)$$

$$A = \frac{2.3 \cdot Q^{5/6}}{f^{1/3}} \quad ...(8.4e)$$

Where:
- P = wetted perimeter (m)
- R = hydraulic mean depth (m)
- S = regime slope
- V = velocity (m/sec)
- A = cross-sectional area (sq.m)
- Q = discharge (cu.m/sec)
- f = silt factor

**8.5 Regime Width and Depth (Wide Alluvial Streams)**

$$W = \frac{C}{4.8} \times Q^{1/2} = 4.8\,Q^{1/2} \quad ...(8.5a)$$

$$D = \frac{0.473 \cdot Q^{1/3}}{f^{1/3}} \quad ...(8.5b)$$

**Table 4 — Silt Factor 'f' in Lacey's Equations**

| Bed Material | m (grain size, mm) | f (silt factor) |
|---|---|---|
| Silt, very fine | 0.081 | 0.500 |
| Silt, fine | 0.120 | 0.600 |
| Silt, medium | 0.233 | 0.850 |
| Silt, standard | 0.323 | 1.000 |
| Sand, medium | 0.505 | 1.250 |
| Sand, coarse | 0.725 | 1.500 |

**(Table 4 of IRC:SP:13)**

Formula for silt factor: **f = 1.76 √m** (where m = mean diameter of particles in mm)

---

### ARTICLE 9 — LINEAR WATERWAY OF BRIDGES

**9.1 Mandatory Rule — Alluvial Streams:**
> Linear waterway of a bridge across a wholly alluvial stream shall normally be **kept equal to the regime width W** given by Equation (8.5a).

$$W = 4.8\,Q^{1/2}$$

**9.4 Mandatory — Contraction to be Avoided:**
> Linear waterway of the bridge across an alluvial stream **shall not be less than the regime width** of the stream.

**9.5 Quasi-Alluvial Streams:**
> Linear waterway shall be made equal to **actual surface width** of the stream measured edge to edge of water along the HFL on the plotted cross-section.

**9.6 Streams with Rigid Boundaries:**
> Same as 9.5 (surface width at HFL); some reduction may be possible for moderate velocities if it leads to tangible savings.

---

### ARTICLE 10 — NORMAL SCOUR DEPTH OF ALLUVIAL STREAMS

**10.2 Normal Scour Depth (Alluvial — no contraction):**
Provided linear waterway ≥ regime width W (Eq. 8.5a), normal scour depth D = regime depth from **Equation (8.5b)**:

$$D = \frac{0.473 \cdot Q^{1/3}}{f^{1/3}}$$

**10.3 Modified Normal Scour Depth (when L < W — contraction):**

$$D' = D\left(\frac{W}{L}\right)^{0.61} \quad ...(10.3)$$

Where:
- D = normal regime depth (m)
- W = regime width (m) [alluvial] or unobstructed natural width [quasi-alluvial]
- L = linear waterway of bridge (m)

---

### ARTICLE 11 — NORMAL SCOUR DEPTH OF QUASI-ALLUVIAL STREAMS

**11.4 (When stream width is large compared to depth):**

$$D = d \times \left(\frac{Q}{q}\right)^{3/5} \quad ...(11.4)$$

Where:
- d = normal scour depth for discharge q (from plotted section)
- Q = design discharge; q = discharge in plotted section

**11.6 (When slope is known):**

$$Q = \frac{W \times S^{1/2} \times D^{5/3}}{n} \quad ...(11.6)$$

Solve for D (normal scour depth) knowing Q, W, S, n.

**11.7 (Approximate — when neither slope nor velocity is known):**

$$D = \frac{1.21\,Q^{0.63}}{f^{0.33} \times W^{0.60}} \quad \text{(Eq. 11.7)}$$

---

### ARTICLE 12 — EFFECT OF CONTRACTION ON NORMAL SCOUR DEPTH

**12.1 Modified Normal Scour Depth Under Bridge (Contracted Section):**

$$D' = D\left(\frac{W}{L}\right)^{0.61} \quad ...(12.1)$$

Where:
- D' = increased scour depth under the bridge
- D = normal scour depth of unobstructed stream
- W = width of stream (regime width for alluvial; surface width for quasi-alluvial)
- L = linear waterway of bridge

---

### ARTICLE 13 — MAXIMUM SCOUR DEPTH

**13.3 Summary — How to Calculate Normal Scour Depth:**
- **(i) Alluvial Streams:** D from Eq. (8.5b) if L ≥ W; else D' from Eq. (12.1)
- **(ii) Quasi-Alluvial / Streams with Rigid Banks but Erodible Bed:** D from Article 11 if L ≥ unobstructed natural width; else D' from Eq. (12.1)

**13.4 Rules for Maximum Scour Depth (Dm):**

> **Rule 1:** For average conditions on a straight reach; single-span bridge (no piers):
> $$D_m = 1.27 \times D' \quad \text{(i.e., 27\% more than modified normal scour depth)}$$

> **Rule 2:** For bad sites (curves, diagonal currents) OR multi-span bridges (with piers):
> $$D_m = 2 \times D' \quad \text{(i.e., twice the modified normal scour depth)}$$

> **Rule 3:** For bridges causing contraction (Rules 1 or 2 apply), compare D_m from Rule 1/2 with:
> $$D_m = D\left(\frac{W}{L}\right)^{1.56} \quad ...(13.5)$$
> **Adopt the greater of the two values.**

Where:
- D_m = maximum scour depth (m) below HFL
- D = normal scour depth of unobstructed stream
- W = regime width (alluvial) or unobstructed natural width (quasi-alluvial)
- L = linear waterway of bridge

**13.7 Mandatory:** The finally adopted D_m must **not be less than the depth of the deepest scour hole** found by inspection at or near the site of the bridge.

---

### ARTICLE 14 — DEPTH OF BRIDGE FOUNDATIONS (Df)

**14.1 Mandatory Foundation Depth Rules:**

> **Rule (1) — Erodible Beds:**
> Foundations shall be taken down to a depth below the maximum high flood level **one-third greater than the calculated depth of maximum scour**, subject to a minimum depth below the scour line of:
> - **2 metres for arched bridges**
> - **1.2 metres for all other bridges**

*Numerically:* Foundation level = HFL − D_m − (D_m/3), not less than (Scour line − 1.2 m for slab bridges or − 2.0 m for arched bridges)

> **Rule (2) — Hard Beds:**
> When substantial solid rock or non-erodible material is encountered at or above the level given by Rule (1), foundations shall be **securely anchored into that material**:
> - ~**0.3 m into rock**
> - ~**0.6 m into other hard material**

> **Rule (3) — All Beds:**
> Pressure on foundation material shall be **well within the bearing capacity** of the material.

**14.3 Culverts on Erodible Soil — Sound Practice:**
- Keep top of floor **~0.3 m below bed level**
- Foundation of abutment: **1.25 m below top of floor**
- Upstream curtain wall: **1.0 to 1.5 m deep** from top of floor
- Downstream curtain wall: **1.5 to 2.5 m deep** from top of floor

---

### ARTICLE 15 — LENGTH OF CLEAR SPAN AND NUMBER OF SPANS

**15.1 Mandatory:** Number of spans shall be **as small as possible**; piers obstruct flow. In mountainous regions, span from bank to bank with no piers if possible.

**15.4 Economical Span Length:**

For masonry arched bridges:
$$S = 2H \quad ...(15.4a)$$

For R.C.C. slab bridges:
$$S = 1.5H \quad ...(15.4b)$$

Where:
- S = clear span length (m)
- H = total height of abutment or pier from bottom of foundation to top (m); for arched bridges, H is measured from foundation to intrados of key stone

---

### ARTICLE 16 — STRUCTURAL DETAILS OF MINOR BRIDGES AND CULVERTS

**16.1 Loading Standards (Mandatory):**
- Bridges and culverts on **National Highways**: designed for **one lane of Class 70R** or **two lanes of Class 'A'** loading — whichever produces more severe stresses
- **For culverts with small spans**: abutment sections may be adopted from Plate 4 for Class 70R or 2 lanes Class 'A' loading; for bridges, detailed design is mandatory

**16.2 Wing Walls and Return Walls:**
- Long and hefty wing walls shall be avoided
- Foundation of wing walls shall be stepped up where soil profile permits (economy)
- Short return walls shall be adopted where they meet requirements

**16.3 Unreinforced Masonry Arches:**
- Masonry: cement concrete blocks 1:3:6 OR dressed stones/bricks in 1:3 cement mortar
- Crushing strength of concrete/stone/brick units: **not less than 106 kg per sq.m**
- Where stone masonry is used: either **coursed rubble masonry** or **ashlar masonry**

**Arch Ring Design Reactions (Table 5 of IRC:SP:13):**

| Sl. No. | Span (m) (Effective) | Horizontal Reaction (Tonnes) | Vertical Reaction (Tonnes) | Moment at Springing (Tonne-Metres) |
|---|---|---|---|---|
| 1 | 6 | 9.35 | 10.92 | (+) 0.30 |
| 2 | 9 | 17.40 | 21.00 | (+) 0.47 |
| 3 | 12 | 27.00 | 33.60 | (+) 0.62 |

*(Dead load due to arch ring masonry, fill material, road crust — 1 m perpendicular to traffic; right bridges)*

---

### ARTICLE 17 — ELEMENTS OF THE HYDRAULICS OF FLOW THROUGH BRIDGES

**17.2 Weir Formula (applies when afflux h ≥ ¼ Dd):**

$$Q = 1.706 \cdot C_w \cdot L \cdot H^{3/2} \quad ...(17.2a)$$

$$Q = 1.706 \cdot C_w \cdot L \left(D_u + \frac{u^2}{2g}\right)^{3/2} \quad ...(17.2b)$$

Where:
- Q = discharge through bridge (cu.m/sec)
- L = linear waterway (sum of spans)
- H = total head = Du + u²/2g
- Du = upstream depth of flow
- u = upstream velocity of approach
- Cw = discharge coefficient

**Values of Cw:**
- Narrow bridge opening with or without floors: **0.94**
- Wide bridge opening with floors: **0.96**
- Wide bridge opening without bed floors: **0.98**

**17.3 Orifice Formula (applies when afflux h < ¼ Dd):**

$$Q = C_o \cdot \sqrt{2g} \cdot L \cdot D_d \sqrt{\left(h + 1.85\frac{u^2}{2g}\right)} \quad ...(17.3)$$

Where:
- Co = orifice coefficient (read from Fig. 15 of IRC:SP:13 based on L/W or a/A ratio; ranges 0.80–1.00)
- Dd = downstream depth
- h = afflux (Du − Dd)
- e = 1.85 approximately (velocity of approach factor)

**17.4 Key Conclusions (Mandatory):**
1. Dd is NOT affected by the existence of the bridge — it depends only on the conveyance factor and slope of the tail race
2. Weir Formula applies only when standing wave is formed (h ≥ ¼ Dd)
3. Orifice Formula applies when afflux < ¼ Dd

---

### ARTICLE 18 — AFFLUX

**18.1 Definition:** Afflux at a bridge = heading up of water surface caused by it; measured as difference in water surface levels upstream and downstream (h = Du − Dd)

**18.4 Data Required for Afflux Calculation:**
1. Design discharge Q
2. Unobstructed natural width of stream W
3. Inner waterway of bridge L
4. Average depth downstream Dd

**18.5:** Dd is **not affected** by the bridge — it is the depth prevailing at the bridge site before its construction and is determined from tail-race conveyance and slope.

**Afflux Calculation Procedure:**
- Determine contraction ratio = L/W (or a/A)
- If contraction significant (standing wave forms) → use Weir Formula
- Otherwise → use Orifice Formula
- Solve simultaneously for u and h

---

### ARTICLE 20 — OVERTOPPING OF THE BANKS

**20.2 Mandatory — Height of Approach Roads:**
- Approach road embankment level must be high enough to intercept overflow AND not be overtopped
- At velocity Vm, embankment top level must be raised by V²m/19.6 m above HFL at overflow point

**20.3 Relief / Subsidiary Culverts:**
- Where overflow cannot be forced back into main channel, **relief culverts shall be provided** at suitable points in road embankment
- Relief culverts shall be large enough to prevent detrimental ponding but not so large as to attract the main current

**20.4 Permanent Dips / Breaching Sections:**
- Where relief culverts are impracticable, dips or breaching sections may be provided in approach road — only acceptable as a last resort

---

### ARTICLE 21 — FEASIBILITY OF PIPE AND BOX CULVERTS FLOWING FULL

**21.7 Mandatory:**
- Small culverts need **not** be designed for adequate clearance for floating matter
- Depth of culvert shall be **small** — it does not matter if opening stops appreciably below formation level
- Culvert may function even with **inlet submerged** (full-flow design is permissible)

**21.8 Mandatory:**
- High headwalls shall **NOT** be provided for retaining deep over-fills; length of culvert shall be increased suitably so that road embankment with natural side slopes is accommodated without high retaining headwalls

**21.9 Mandatory:**
- Culverts functioning under "head" (masonry abutments supporting arches or slabs): **bed pavements must be provided**
- Adequate provision against erosion at exit: **curtain walls** shall be designed
- Where exit is free overfall: **cistern + bafflewall** shall be added for energy dissipation

---

### ARTICLE 22 — HYDRAULICS OF PIPE AND BOX CULVERTS FLOWING FULL

**22.3 Operating Head H:**
> H = height of upstream water level measured from surface level in tail race OR from crown of exit of culvert — whichever is higher

**22.4 Design Formula:**

$$H = \left[1 + K_e + K_f\right] \frac{v^2}{2g} \quad ...(22.4)$$

Where:
- H = operating head (m)
- v = velocity through culvert (m/sec)
- Ke = entry loss coefficient
- Kf = friction loss coefficient

**22.5 Values of Ke and Kf:**

$$K_e = 0.08 \text{ (bevelled/bell-mouthed entry)}$$
$$K_e = 0.505 \text{ (sharp-edged entry)} \quad ...(22.5a)$$

$$K_f = \frac{14.85\,n^2}{R^{4/3}} \cdot \frac{L}{R} \quad ...(22.5b)$$

For cement concrete circular pipes or cement-plastered masonry rectangular culverts (n = 0.015):
$$K_f = \frac{0.00334\,L}{R^{1.33}} \quad ...(22.5c)$$

**Table 5 — Values of Ke and Kf (Recommended)**

| Entry & Friction Coefficients | Circular Pipes (Square entry) | Circular Pipes (Bevelled entry) | Rectangular Culverts (Square entry) | Rectangular Culverts (Bevelled entry) |
|---|---|---|---|---|
| Ke | 1.107 R⁰·⁵ | 0.1 | 0.572 R⁰·³ | 0.05 |
| Kf | 0.00394 L/R¹·² | 0.00394 L/R¹·² | 0.00335 L/R¹·²⁵ | 0.00335 L/R¹·²⁵ |

**(Table 5 of IRC:SP:13)**

**22.7 Design Procedure:**
1. Fix permissible heading-up level H (road bank not to be overtopped)
2. Determine tail-race surface level = Dd
3. Operating head H = (permissible u/s level) − (tail-race level)
4. Calculate v from H = [1 + Ke + Kf] v²/2g
5. Area of barrel = Q/v
6. Select pipe diameter or box culvert dimensions accordingly

---

## PART B: DESIGN TABLES — SUMMARY

### Table B1 — Cross-Section Distances Required (Article 2)
| Catchment Area | Distance u/s & d/s |
|---|---|
| Up to 2.5 sq km | 150 m |
| 2.5 to 10 sq km | 300 m |
| Over 10 sq km | 400–1600 m |

### Table B2 — Run-off Coefficient P (Article 4 — Table 2)
| Catchment Type | P max |
|---|---|
| Bare rock / city pavements | 0.90 |
| Rock, steep wooded | 0.80 |
| Plateaus, lightly covered | 0.70 |
| Clayey, stiff bare | 0.60 |
| Clayey, lightly covered | 0.50 |
| Loam, lightly cultivated | 0.40 |
| Loam, largely cultivated | 0.30 |
| Sandy, light growth | 0.20 |
| Sandy, heavy brush | 0.10 |

### Table B3 — Manning's Rugosity 'n' (Article 5 — Table 3)
| Natural Stream Type | Perfect | Good | Fair | Bad |
|---|---|---|---|---|
| Clean, straight, no rifts | 0.025 | 0.0275 | 0.030 | 0.033 |
| Weeds and stones | 0.030 | 0.033 | 0.035 | 0.040 |
| Winding, pools, shoals | 0.035 | 0.040 | 0.045 | 0.050 |
| Lower stages, ineffective slope | 0.040 | 0.045 | 0.050 | 0.055 |
| Weeds and stones (winding) | 0.033 | 0.035 | 0.040 | 0.045 |
| Stony sections | 0.045 | 0.050 | 0.055 | 0.060 |
| Sluggish, deep pools | 0.050 | 0.060 | 0.070 | 0.080 |
| Very weedy | 0.075 | 0.100 | 0.125 | 0.150 |

### Table B4 — Lacey's Silt Factor 'f' (Article 8 — Table 4)
| Material | Grain size (mm) | f |
|---|---|---|
| Silt, very fine | 0.081 | 0.500 |
| Silt, fine | 0.120 | 0.600 |
| Silt, medium | 0.233 | 0.850 |
| Silt, standard | 0.323 | 1.000 |
| Sand, medium | 0.505 | 1.250 |
| Sand, coarse | 0.725 | 1.500 |

### Table B5 — Maximum Scour Depth Multipliers (Article 13)
| Site Condition | Bridge Type | Multiplier |
|---|---|---|
| Straight reach, average conditions | Single span (no piers) | 1.27 × D' |
| Bad site (curves/diagonal currents) | Any | 2.0 × D' |
| Multi-span bridge (piers present) | Any | 2.0 × D' |
| All contracting bridges | Any | Check: D(W/L)^1.56; adopt greater |

### Table B6 — Foundation Depth Below Scour Line (Article 14)
| Bed Type | Minimum Depth Below Scour Line |
|---|---|
| Erodible — Arched Bridges | 2.0 m |
| Erodible — All Other Bridges | 1.2 m |
| Rock | ~0.3 m (anchored) |
| Other Hard Material | ~0.6 m (anchored) |

### Table B7 — Ke and Kf for Culverts (Article 22 — Table 5)
| Entry Type | Ke (Circular) | Ke (Rectangular) |
|---|---|---|
| Square/sharp-edged | 1.107 R⁰·⁵ | 0.572 R⁰·³ |
| Bevelled/bell-mouthed | 0.1 | 0.05 |

---

## PART C: KEY FORMULAE SUMMARY

| Formula | Expression | Use | Article |
|---|---|---|---|
| Dickens' | Q = CM^(3/4) | Empirical peak run-off | 3.2 |
| Ryve's | Q = CM^(2/3) | Empirical peak run-off | 3.3 |
| Inglis' | Q = 125M/(√M+10) | Empirical peak run-off (Bombay) | 3.4 |
| Time of Concentration | tc = (0.87 × L³/H)^0.385 | Concentration time (hours) | 4.7 |
| Critical Intensity | Ic = I₀(2/(tc+1)) | Design rainfall intensity | 4.8b |
| Rational Formula | Q = 0.028 PAIc | Peak run-off | 4.9 |
| Manning's Velocity | V = R^(2/3).S^(1/2)/n | Stream velocity | 5.4a |
| Conveyance Factor | λ = A.R^(2/3)/n; Q = λ.S^(1/2) | Discharge from surveyed section | 5.6 |
| Lacey's Regime Width | W = 4.8Q^(1/2) | Linear waterway for alluvial stream | 8.5a |
| Lacey's Regime Depth | D = 0.473Q^(1/3)/f^(1/3) | Normal scour depth alluvial | 8.5b |
| Silt Factor | f = 1.76√m | Silt factor from grain size | 8.4 |
| Modified Scour Depth | D' = D(W/L)^0.61 | Scour depth with contraction | 12.1 |
| Max Scour Rule 1 | Dm = 1.27 × D' | Straight, single span | 13.4 |
| Max Scour Rule 2 | Dm = 2.0 × D' | Bad site / multi-span | 13.4 |
| Max Scour Rule 3 | Dm = D(W/L)^1.56 | Check for contracting bridges | 13.5 |
| Economical Span (Arch) | S = 2H | Masonry arch | 15.4a |
| Economical Span (Slab) | S = 1.5H | RCC slab | 15.4b |
| Weir Formula | Q = 1.706 CwLH^(3/2) | Flow through bridge (h ≥ ¼Dd) | 17.2a |
| Orifice Formula | Q = Co√(2g).L.Dd.√(h+1.85u²/2g) | Flow through bridge (h < ¼Dd) | 17.3 |
| Culvert Full Flow | H = [1+Ke+Kf]v²/2g | Culvert hydraulics full flow | 22.4 |
| Kf (CC pipes, n=0.015) | Kf = 0.00334L/R^1.33 | Friction loss coefficient | 22.5c |

---

## PART D: DPR COMPLIANCE CHECKLIST — IRC:SP:13

*Each item maps to a specific mandatory clause. Use for DPR review against IRC:SP:13.*

---

### D1 — SITE DATA & INVESTIGATION

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 1 | Site selected on straight reach, below bends | Art. 1.1(i) | | |
| 2 | Site away from confluence of large tributaries | Art. 1.1(ii) | | |
| 3 | Well-defined banks exist at site | Art. 1.1(iii) | | |
| 4 | Approach roads feasible on straight | Art. 1.1(iv) | | |
| 5 | Crossing is square (90°) or nearest possible | Art. 1.1(v) | | |
| 6 | Inspection of existing structures (if any) within reach — recorded | Art. 1.2 | | |
| 7 | Channel conditions noted for silt factor & rugosity | Art. 1.3 | | |

### D2 — ESSENTIAL DESIGN DATA

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 8 | Catchment area measured (traverse or topo map) | Art. 2.2 | | |
| 9 | Minimum 3 cross-sections taken (u/s, at site, d/s) at correct distances per Table 1 | Art. 2.3 | | |
| 10 | Cross-section scale: H not less than 1/1000; V not less than 1/100 | Art. 2.3 | | |
| 11 | Maximum HFL ascertained and marked on cross-sections | Art. 2.5 | | |
| 12 | Longitudinal section drawn to required distances | Art. 2.6 | | |
| 13 | Velocity observations recorded (if possible during flood) | Art. 2.7 | | |
| 14 | Trial pits taken to rock or to 2× anticipated scour depth | Art. 2.8 | | |
| 15 | Trial pit locations shown on cross-sections | Art. 2.8 | | |

### D3 — HYDROLOGY / DESIGN DISCHARGE

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 16 | Design discharge computed by at least two independent methods | Art. 7.1 | | |
| 17 | Highest value adopted; does not exceed next highest by > 50% | Art. 7.1 | | |
| 18 | If >50% exceedance: Q restricted to 150% of next highest | Art. 7.1 | | |
| 19 | Return period stated: 20 years (small bridges) or 100 years (major) | Art. 7.2 | | |
| 20 | Correct value of 'C' used in Dickens'/Ryve's formula (region-specific) | Art. 3.2/3.3 | | |
| 21 | Correct P value used from Table 2 for catchment type | Art. 4.9 | | |
| 22 | tc calculated using Eq. 4.7 (L and H from survey) | Art. 4.7 | | |
| 23 | I₀ obtained from regional data / Appendix A of IRC:SP:13 | Art. 4.5 | | |
| 24 | Manning's 'n' selected from Table 3 appropriate to stream condition | Art. 5.4 | | |

### D4 — WATERWAY DESIGN

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 25 | Silt factor 'f' determined from Table 4 / grain size analysis | Art. 8.4 | | |
| 26 | Regime width W = 4.8√Q computed for alluvial streams | Art. 8.5a | | |
| 27 | Linear waterway ≥ regime width W (alluvial streams) | Art. 9.1 | | |
| 28 | Linear waterway = surface width at HFL for quasi-alluvial streams | Art. 9.5 | | |
| 29 | Contraction justified with detailed economic analysis (if L < W) | Art. 9.3 | | |

### D5 — SCOUR CALCULATIONS

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 30 | Normal scour depth D computed by Lacey's Eq. (8.5b) for alluvial | Art. 10.2 | | |
| 31 | Modified scour depth D' computed by Eq. (12.1) if L < W | Art. 12.1 | | |
| 32 | Maximum scour Dm by Rule 1 (1.27×D') for single span straight reach | Art. 13.4 | | |
| 33 | Maximum scour Dm by Rule 2 (2×D') for multi-span/bad site | Art. 13.4 | | |
| 34 | Eq. (13.5) [D(W/L)^1.56] checked for contracting bridges; greater adopted | Art. 13.4 Rule 3 | | |
| 35 | Dm not less than deepest scour hole found by site inspection | Art. 13.7 | | |

### D6 — FOUNDATION DEPTH

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 36 | Foundation depth = Dm + Dm/3 below HFL (erodible beds) | Art. 14.1 Rule 1 | | |
| 37 | Minimum 1.2 m below scour line (slab/girder bridges) | Art. 14.1 Rule 1 | | |
| 38 | Minimum 2.0 m below scour line (arched bridges) | Art. 14.1 Rule 1 | | |
| 39 | Foundation anchored ≥0.3 m into rock (hard bed) | Art. 14.1 Rule 2 | | |
| 40 | Foundation anchored ≥0.6 m into other hard material | Art. 14.1 Rule 2 | | |
| 41 | Foundation pressure checked against bearing capacity | Art. 14.1 Rule 3 | | |
| 42 | Culvert: floor 0.3 m below bed; u/s curtain 1–1.5 m; d/s curtain 1.5–2.5 m | Art. 14.3 | | |

### D7 — STRUCTURAL DESIGN

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 43 | NHW bridges/culverts: designed for Class 70R or 2 lanes Class A (worst case) | Art. 16.1 | | |
| 44 | Number of spans minimised; piers avoided in mountainous terrain | Art. 15.1 | | |
| 45 | Economical span verified (S=2H for masonry arch; S=1.5H for RCC slab) | Art. 15.4 | | |
| 46 | Masonry arch: material strength ≥ 106 kg/sq.m; coursed rubble or ashlar | Art. 16.3 | | |
| 47 | Arch reactions and moments verified against Table 5 values | Art. 16.3 | | |
| 48 | Wing walls / return walls not unnecessarily long; foundations stepped | Art. 16.2 | | |
| 49 | Pier length minimised in scourable beds; circular piers for skew bridges | Art. 16.1 | | |

### D8 — AFFLUX AND HYDRAULICS

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 50 | Afflux computed (Weir or Orifice formula as applicable) | Art. 18 | | |
| 51 | Weir formula used when h ≥ ¼Dd (standing wave condition) | Art. 17.2 | | |
| 52 | Orifice formula used when h < ¼Dd | Art. 17.3 | | |
| 53 | Downstream depth Dd determined from tail-race conveyance/slope | Art. 18.5 | | |
| 54 | Afflux does not cause damage to upstream properties / road | Art. 18.3 | | |
| 55 | Correct Cw value used (0.94/0.96/0.98 per opening type) | Art. 17.2 | | |
| 56 | Correct Co value read from Fig.15 curves (L/W or a/A ratio) | Art. 17.3 | | |

### D9 — OVERTOPPING AND APPROACH EMBANKMENT

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 57 | Approach road embankment level adequate to prevent overtopping | Art. 20.2 | | |
| 58 | Relief culverts provided where overflow cannot be directed to main bridge | Art. 20.3 | | |
| 59 | Relief culvert size: not too small (ponding) nor too large (attracts main current) | Art. 20.3 | | |

### D10 — CULVERT HYDRAULICS (FULL FLOW)

| # | Compliance Item | IRC:SP:13 Ref | Compliant | Deficiency |
|---|---|---|---|---|
| 60 | Permissible heading-up level established (road bank not overtopped) | Art. 22.1 | | |
| 61 | Tail-race surface level (Dd) established from site data | Art. 22.2 | | |
| 62 | Operating head H = u/s level − tail-race level computed | Art. 22.3 | | |
| 63 | Ke value used correctly (0.08 bell-mouthed; 0.505 sharp-edged) | Art. 22.5a | | |
| 64 | Kf computed: 0.00334L/R^1.33 for CC pipes (n=0.015) | Art. 22.5c | | |
| 65 | Barrel area = Q/v verified; pipe diameter / box size selected | Art. 22.7 | | |
| 66 | High headwalls NOT provided; length of culvert increased instead | Art. 21.8 | | |
| 67 | Bed pavement provided for culverts under "head" condition | Art. 21.9 | | |
| 68 | Curtain walls at exit designed; cistern+baffle wall for free overfall exits | Art. 21.9 | | |

---

## PART E: CRITICAL NON-COMPLIANCES (AUTO-FLAG TRIGGERS)

The following shall be flagged as **CRITICAL** deficiencies in any DPR:

| # | Trigger Condition | IRC:SP:13 Ref |
|---|---|---|
| C1 | Design discharge computed by only one method | Art. 7.1 |
| C2 | Linear waterway < regime width for alluvial stream (without economic justification) | Art. 9.1 / 9.4 |
| C3 | Maximum scour depth not computed; foundation depth based on standard tables only | Art. 13 / 14 |
| C4 | Foundation depth less than 1.2 m (slab) or 2.0 m (arch) below scour line | Art. 14.1 Rule 1 |
| C5 | Foundation on erodible soil without trial pit investigation | Art. 2.8 |
| C6 | Bridges on NHW not designed for Class 70R / 2 lanes Class A | Art. 16.1 |
| C7 | Afflux not calculated; no verification that u/s flooding will not occur | Art. 18 |
| C8 | Culvert design ignores operating head concept; sized only by empirical tables | Art. 22 |
| C9 | No cross-sections taken at required distances u/s and d/s | Art. 2.3 |
| C10 | Maximum HFL not ascertained or not marked on drawings | Art. 2.5 |
| C11 | No curtain walls / energy dissipation at culvert exits | Art. 21.9 |
| C12 | Dm adopted less than deepest observed scour hole at site | Art. 13.7 |

---

*End of IRC:SP:13 Extraction*
*Prepared for DPR Analyzer Pro — BRO / MES Infrastructure Compliance System*
*Source: IRC Special Publication 13 — Guidelines for the Design of Small Bridges and Culverts, 1998*
