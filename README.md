# 🎯 Brawl Picker
> Brawler recommendation engine for Brawl Stars ranked game — based on features of map, brawler(game characters) and game mode.

🔗 **Live Demo:** [brawlstars-brawlerpicker.vercel.app](https://brawlstars-brawlerpicker.vercel.app)


---

## The Problem
In Brawl Stars ranked game, map layouts vary. Some are open fields where long-range brawlers dominate, others are wall-heavy terrain where close-range brawlers thrive, but it can be cancelled out with game mode or brawler's skills and attack features. *With 100+ brawlers, 20+ maps, and 6 game modes without in-game guidance, players are expected to evaluate brawler fit on their own before each match.*

Existing brawler recommenders are based on win-rate, *but win-rate is a noisy signal*. It is calculated across all players, meaning a brawler heavily favoured by high-skill players will show inflated win-rate regardless of whether it's a strong terrain fit.

---

## The Solution
Brawl Picker recommends brawlers by analyzing the map's physical features and cross-referencing them with each brawler's stats and ability tags.
Each map image is run through a Canvas API pixel-grid analysis logic that automatically extracts bush coverage, wall density, and open space percentages. 
A two-part scoring engine (`mapCalculator` + `modeCalculator`) then weights those terrain features against brawler stats to surface the top picks, along with a plain-language breakdown of why each brawler was recommended.

---

## Tech Stack
- **Frontend:** React + Vite
- **Styling:** HTML/CSS
- **Terrain Analysis:** Canvas API (pixel-grid color sampling)
- **Data:** Local JSON (`brawlerData.json`, `mapData.json`), Brawlify API
- **Deployment:** Vercel

---

## Key Design Decisions

**Win-rate vs. feature-driven scoring**
Win-rate reflects player skill, not map fit. A brawler with high win-rate on a map might just be popular among skilled players. Instead, Brawl Picker scores each brawler directly against terrain features (openness, choke density, bush position, flank routes) so recommendations stay map-specific.

**Canvas API for terrain auto-tagging**
Manually tagging terrain for 26 maps would mean repeating the same work every time a map is added. Instead, hand-drawn pixel-grid map images are analyzed by color at runtime — bush (green), wall (soft : yello/ red : hard), and water (blue) pixels are counted and converted into coverage percentages automatically.
