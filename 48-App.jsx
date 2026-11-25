import React, { useMemo, useState } from 'react'

// ---------- pantry & recipes ----------

const PANTRY = [
  { id: 'rice', name: 'Rice', emoji: '🍚' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'lentils', name: 'Lentils', emoji: '🥣' },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🫘' },
  { id: 'fava', name: 'Fava beans', emoji: '🫛' },
  { id: 'eggs', name: 'Eggs', emoji: '🥚' },
  { id: 'chicken', name: 'Chicken', emoji: '🍗' },
  { id: 'beef', name: 'Beef', emoji: '🥩' },
  { id: 'potatoes', name: 'Potatoes', emoji: '🥔' },
  { id: 'tomatoes', name: 'Tomatoes', emoji: '🍅' },
  { id: 'onions', name: 'Onions', emoji: '🧅' },
  { id: 'garlic', name: 'Garlic', emoji: '🧄' },
  { id: 'eggplant', name: 'Eggplant', emoji: '🍆' },
  { id: 'zucchini', name: 'Zucchini', emoji: '🥒' },
  { id: 'peppers', name: 'Peppers', emoji: '🫑' },
  { id: 'spinach', name: 'Spinach / Molokhia', emoji: '🥬' },
  { id: 'okra', name: 'Okra (Bamia)', emoji: '🌿' },
  { id: 'bread', name: 'Baladi bread', emoji: '🫓' },
  { id: 'cheese', name: 'White cheese', emoji: '🧀' },
  { id: 'butter', name: 'Butter / Ghee', emoji: '🧈' },
  { id: 'oil', name: 'Oil', emoji: '🫗' },
  { id: 'lemon', name: 'Lemon', emoji: '🍋' },
  { id: 'yogurt', name: 'Yogurt', emoji: '🥛' },
  { id: 'tahini', name: 'Tahini', emoji: '🥜' },
  { id: 'tomato-paste', name: 'Tomato paste', emoji: '🥫' },
  { id: 'cumin', name: 'Cumin', emoji: '🌶️' },
  { id: 'vermicelli', name: 'Vermicelli (sha\'reya)', emoji: '🍜' },
  { id: 'hummus-can', name: 'Canned hummus', emoji: '🫙' },
]

const RECIPES = [
  {
    id: 'koshary', name: 'Koshary', emoji: '🍲', time: 50, difficulty: 'Medium', serves: 6,
    desc: 'The national dish: rice, lentils and pasta topped with spiced tomato sauce, crispy onions and chickpeas.',
    needs: ['rice', 'lentils', 'pasta', 'chickpeas', 'tomatoes', 'onions', 'garlic', 'oil', 'tomato-paste', 'cumin'],
    steps: [
      'Boil the lentils until just tender, then the rice in the same pot with a spoon of oil.',
      'Cook the pasta separately. Warm the chickpeas.',
      'Fry sliced onions in plenty of oil until deep golden; drain and keep the oil.',
      'Simmer blended tomatoes with garlic, cumin, tomato paste, salt and a splash of vinegar into a thick sauce.',
      'Layer rice, lentils, pasta and chickpeas. Top with sauce and a mountain of crispy onions.',
    ],
  },
  {
    id: 'ful', name: 'Ful Medames', emoji: '🫛', time: 20, difficulty: 'Easy', serves: 3,
    desc: 'Slow-cooked fava beans mashed with lemon, cumin and oil. The breakfast of Egypt.',
    needs: ['fava', 'lemon', 'garlic', 'cumin', 'oil', 'bread'],
    steps: [
      'Simmer the fava beans until very soft, then mash coarsely.',
      'Crush garlic with salt, add lemon juice and cumin, and stir into the beans.',
      'Finish with a generous pour of oil and serve with warm baladi bread.',
    ],
  },
  {
    id: 'shawarma-eggs', name: 'Shakshuka', emoji: '🍳', time: 25, difficulty: 'Easy', serves: 2,
    desc: 'Eggs poached in a rich tomato and pepper sauce. Scoop it up with bread.',
    needs: ['eggs', 'tomatoes', 'peppers', 'onions', 'garlic', 'oil', 'cumin', 'bread'],
    steps: [
      'Soften onions and peppers in oil, add garlic and cumin.',
      'Add chopped tomatoes and simmer into a thick sauce, about 10 minutes.',
      'Make wells, crack in the eggs, cover and cook until the whites set.',
    ],
  },
  {
    id: 'mahshi', name: 'Mahshi (Stuffed Vegetables)', emoji: '🍆', time: 90, difficulty: 'Hard', serves: 6,
    desc: 'Zucchini, eggplant and peppers stuffed with herbed rice, simmered in tomato broth. A labor of love.',
    needs: ['zucchini', 'eggplant', 'peppers', 'rice', 'tomatoes', 'onions', 'tomato-paste', 'oil'],
    steps: [
      'Core the vegetables. Mix rice with grated tomato, onion, dill and parsley if you have them.',
      'Stuff loosely (rice expands) and pack snugly in a pot.',
      'Cover with tomato-paste broth, simmer 45-60 minutes until the rice is tender.',
    ],
  },
  {
    id: 'molokhia', name: 'Molokhia with Chicken', emoji: '🥬', time: 60, difficulty: 'Medium', serves: 4,
    desc: 'Jute-leaf soup, garlicky and silky, served over rice with roasted chicken.',
    needs: ['spinach', 'chicken', 'garlic', 'butter', 'rice'],
    steps: [
      'Boil the chicken with onion and spices; keep the broth.',
      'Add chopped molokhia (or spinach) to simmering broth without boiling hard.',
      'Fry crushed garlic in butter until golden and pour it sizzling over the pot - the ta\'leya.',
      'Serve over rice with the chicken.',
    ],
  },
  {
    id: 'bamia', name: 'Bamia (Okra Stew)', emoji: '🌿', time: 45, difficulty: 'Easy', serves: 4,
    desc: 'Tender okra in a garlicky tomato stew, great over rice.',
    needs: ['okra', 'tomatoes', 'garlic', 'onions', 'tomato-paste', 'oil', 'rice'],
    steps: [
      'Brown garlic and onions in oil, add okra and toss for a minute.',
      'Add tomatoes and tomato paste with a cup of water, simmer 25-30 minutes.',
      'Serve over rice with a squeeze of lemon.',
    ],
  },
  {
    id: 'fattah', name: 'Fattah', emoji: '🍚', time: 70, difficulty: 'Hard', serves: 6,
    desc: 'Feast food: crispy bread, rice and beef under a garlic-vinegar tomato sauce.',
    needs: ['beef', 'rice', 'bread', 'garlic', 'tomato-paste', 'butter'],
    steps: [
      'Boil the beef until tender; save the broth.',
      'Crisp torn bread in butter, then soak with broth and a garlic-vinegar mix.',
      'Layer bread, rice and beef, and crown with tomato sauce.',
    ],
  },
  {
    id: 'macarona-bechamel', name: 'Macarona Bechamel', emoji: '🍝', time: 60, difficulty: 'Medium', serves: 6,
    desc: 'Egyptian baked pasta: penne, spiced beef and creamy bechamel, golden on top.',
    needs: ['pasta', 'beef', 'butter', 'yogurt', 'onions', 'tomato-paste', 'eggs'],
    steps: [
      'Brown the beef with onions and tomato paste.',
      'Boil the pasta. Make a bechamel with butter, flour and milk (or yogurt thinned with water).',
      'Layer pasta, beef, pasta, bechamel; bake 30 minutes until golden.',
    ],
  },
  {
    id: 'torshi-potatoes', name: 'Batates m\'aamar (Oven Potatoes)', emoji: '🥔', time: 55, difficulty: 'Easy', serves: 4,
    desc: 'Crispy roasted potato wedges with garlic and cumin.',
    needs: ['potatoes', 'garlic', 'oil', 'cumin', 'lemon'],
    steps: [
      'Cut potatoes into wedges, toss with oil, crushed garlic, cumin and salt.',
      'Roast at 220C for 40-45 minutes, turning once.',
      'Finish with lemon and serve next to anything.',
    ],
  },
  {
    id: 'eggplant-mesaqqa', name: 'Mesa\'a\'a (Eggplant Casserole)', emoji: '🍆', time: 50, difficulty: 'Medium', serves: 4,
    desc: 'Fried eggplant layered with tomato sauce and peppers, baked until it melts.',
    needs: ['eggplant', 'tomatoes', 'peppers', 'garlic', 'oil', 'tomato-paste'],
    steps: [
      'Fry eggplant slices until golden; drain well.',
      'Layer with a garlicky tomato sauce and pepper strips.',
      'Bake 25 minutes. Rest 10 before serving.',
    ],
  },
  {
    id: 'taameya', name: 'Ta\'ameya (Egyptian Falafel)', emoji: '🧆', time: 40, difficulty: 'Medium', serves: 4,
    desc: 'Fava-bean falafel, green inside from herbs, sesame on top.',
    needs: ['fava', 'onions', 'garlic', 'spinach', 'cumin', 'oil', 'bread'],
    steps: [
      'Soak split fava beans overnight, then blend with onion, garlic, leeks and greens.',
      'Season with cumin and coriander, shape patties.',
      'Deep-fry until deeply crisp. Serve in baladi bread with tahini.',
    ],
  },
  {
    id: 'roz-belabn', name: 'Roz Bel Laban (Rice Pudding)', emoji: '🍮', time: 40, difficulty: 'Easy', serves: 4,
    desc: 'Egyptian rice pudding: creamy, simple, best cold.',
    needs: ['rice', 'yogurt', 'butter'],
    steps: [
      'Simmer rice in water until very soft.',
      'Add milk (or yogurt whisked smooth) and sugar to taste; thicken gently.',
      'Pour into bowls, cool, and serve chilled.',
    ],
  },
  {
    id: 'kebda', name: 'Kebda Eskandarani (Alexandria Liver)', emoji: '🥩', time: 25, difficulty: 'Easy', serves: 3,
    desc: 'Sizzling beef strips with garlic, peppers and cumin - street-cart style.',
    needs: ['beef', 'peppers', 'garlic', 'cumin', 'oil', 'lemon', 'bread'],
    steps: [
      'Sear beef strips hard in hot oil.',
      'Add garlic and peppers, cumin and a hit of lemon.',
      'Stuff into bread and eat immediately.',
    ],
  },
  {
    id: 'chicken-pane', name: 'Chicken Pane', emoji: '🍗', time: 35, difficulty: 'Easy', serves: 3,
    desc: 'Crispy breaded chicken, the Friday-table classic.',
    needs: ['chicken', 'eggs', 'bread', 'oil', 'lemon', 'garlic'],
    steps: [
      'Marinate chicken in lemon and garlic.',
      'Coat in egg and breadcrumbs (from dried baladi bread).',
      'Fry until golden and cooked through.',
    ],
  },
  {
    id: 'halawet-sha\'reya', name: 'Sha\'reya (Sweet Vermicelli)', emoji: '🍜', time: 20, difficulty: 'Easy', serves: 4,
    desc: 'Golden toasted vermicelli in syrup with nuts - the quick family dessert.',
    needs: ['vermicelli', 'butter'],
    steps: [
      'Toast vermicelli in butter until deep golden.',
      'Add hot sugar syrup, cover and let it absorb.',
      'Top with nuts or raisins if you have them.',
    ],
  },
]

// ---------- app ----------

const lsKey = 'fridge-to-feast:have'

export default function App() {
  const [have, setHave] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(lsKey) || '[]')
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('all') // all | ready | almost

  const toggle = (id) =>
    setHave((h) => {
      const next = h.includes(id) ? h.filter((x) => x !== id) : [...h, id]
      localStorage.setItem(lsKey, JSON.stringify(next))
      return next
    })

  const scored = useMemo(
    () =>
      RECIPES.map((r) => {
        const missing = r.needs.filter((n) => !have.includes(n))
        return { ...r, missing, pct: Math.round(((r.needs.length - missing.length) / r.needs.length) * 100) }
      }).sort((a, b) => a.missing.length - b.missing.length || a.time - b.time),
    [have],
  )

  const shown = scored.filter((r) => (filter === 'ready' ? r.missing.length === 0 : filter === 'almost' ? r.missing.length > 0 && r.missing.length <= 2 : true))
  const readyCount = scored.filter((r) => r.missing.length === 0).length
  const pantryItem = (id) => PANTRY.find((p) => p.id === id)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
      <header className="mb-2 flex items-center justify-between">
        <div className="font-display text-3xl font-extrabold">
          Fridge <span className="italic text-tomato">to</span> Feast
        </div>
        <div className="rounded-full bg-leaf/10 px-3 py-1 text-sm font-semibold text-leaf">{readyCount} you can cook now</div>
      </header>
      <p className="mb-6 max-w-xl text-char/60">Tap everything you have at home. Egyptian recipes rank themselves by what you can actually make, and list the one or two things you are missing.</p>

      <div className="mb-8 flex flex-wrap gap-2">
        {PANTRY.map((p) => {
          const on = have.includes(p.id)
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`anim-pop rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition ${
                on ? 'border-leaf bg-leaf text-white shadow-sm' : 'border-char/10 bg-white text-char/60 hover:border-leaf/50'
              }`}
            >
              {p.emoji} {p.name}
            </button>
          )
        })}
      </div>

      <div className="mb-4 flex gap-2">
        {[['all', 'All recipes'], ['ready', 'Ready to cook'], ['almost', 'Missing 1-2 items']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${filter === id ? 'bg-tomato text-white' : 'bg-char/5 text-char/60 hover:bg-char/10'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {have.length === 0 && (
        <p className="mb-4 rounded-2xl bg-tomato/5 px-4 py-3 text-sm text-tomato">Your fridge is empty so far - tap some ingredients above.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {shown.map((r) => (
          <div key={r.id} className={`anim-rise overflow-hidden rounded-3xl bg-white shadow-sm ring-1 transition ${r.missing.length === 0 ? 'ring-leaf/40' : 'ring-char/5'}`}>
            <button onClick={() => setOpen(open === r.id ? null : r.id)} className="w-full p-5 text-left">
              <div className="flex items-start gap-3">
                <div className="text-4xl">{r.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl font-bold leading-tight">{r.name}</div>
                  <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-char/40">
                    {r.time} min · {r.difficulty} · serves {r.serves}
                  </div>
                </div>
                {r.missing.length === 0 ? (
                  <span className="rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white">Ready ✓</span>
                ) : (
                  <span className="rounded-full bg-tomato/10 px-3 py-1 text-xs font-bold text-tomato">missing {r.missing.length}</span>
                )}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-char/10">
                <div className={`h-full rounded-full transition-all ${r.missing.length === 0 ? 'bg-leaf' : 'bg-tomato/70'}`} style={{ width: `${r.pct}%` }} />
              </div>
              {r.missing.length > 0 && (
                <div className="mt-2 text-xs text-char/50">
                  needs: {r.missing.map((m) => pantryItem(m)?.name).join(', ')}
                </div>
              )}
            </button>
            {open === r.id && (
              <div className="border-t border-char/5 bg-cream/60 px-5 py-4">
                <p className="mb-3 text-sm text-char/70">{r.desc}</p>
                <ol className="flex flex-col gap-2">
                  {r.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tomato font-display text-xs font-bold text-white">{i + 1}</span>
                      <span className="pt-0.5 text-char/80">{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.needs.map((n) => (
                    <span key={n} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${have.includes(n) ? 'bg-leaf/10 text-leaf' : 'bg-tomato/10 text-tomato'}`}>
                      {pantryItem(n)?.emoji} {pantryItem(n)?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-10 text-center text-xs text-char/40">Your fridge is saved in this browser. No account, no backend.</footer>
    </div>
  )
}
