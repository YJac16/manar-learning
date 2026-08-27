$vocabDir = Join-Path $PSScriptRoot "..\public\images\vocabulary"
$mathDir  = Join-Path $PSScriptRoot "..\public\icons\math"
New-Item -ItemType Directory -Force -Path $vocabDir, $mathDir | Out-Null

function Wrap-Vocab([string]$body) {
@'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <circle cx="100" cy="100" r="92" fill="#F8F4E8" opacity="0.55"/>
{0}
</svg>
'@ -f $body
}

function Wrap-Math([string]$body) {
@'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
{0}
</svg>
'@ -f $body
}

$svgs = @{
  cat = @'
  <ellipse cx="100" cy="130" rx="52" ry="28" fill="#C89B3C"/>
  <ellipse cx="100" cy="95" rx="38" ry="34" fill="#E5C77B"/>
  <path d="M72 72 L62 48 L82 62 Z" fill="#E5C77B" stroke="#C89B3C" stroke-width="2" stroke-linejoin="round"/>
  <path d="M128 72 L138 48 L118 62 Z" fill="#E5C77B" stroke="#C89B3C" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="88" cy="92" r="5" fill="#073B3A"/>
  <circle cx="112" cy="92" r="5" fill="#073B3A"/>
  <path d="M94 104 Q100 110 106 104" stroke="#073B3A" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M78 108 Q88 114 98 110" stroke="#C89B3C" stroke-width="2" stroke-linecap="round"/>
  <path d="M102 110 Q112 114 122 108" stroke="#C89B3C" stroke-width="2" stroke-linecap="round"/>
  <path d="M130 118 Q145 125 155 118" stroke="#C89B3C" stroke-width="4" stroke-linecap="round"/>
'@

  dog = @'
  <ellipse cx="100" cy="128" rx="50" ry="26" fill="#DCCBA7"/>
  <ellipse cx="100" cy="92" rx="36" ry="32" fill="#C89B3C"/>
  <ellipse cx="68" cy="88" rx="14" ry="22" fill="#C89B3C" transform="rotate(-15 68 88)"/>
  <circle cx="88" cy="88" r="5" fill="#073B3A"/>
  <circle cx="112" cy="88" r="5" fill="#073B3A"/>
  <ellipse cx="100" cy="98" rx="10" ry="7" fill="#073B3A" opacity="0.15"/>
  <path d="M96 102 Q100 108 104 102" stroke="#073B3A" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M148 108 Q162 95 168 108 Q162 118 148 112" fill="#C89B3C"/>
'@

  bird = @'
  <rect x="30" y="145" width="140" height="8" rx="4" fill="#0E625B" opacity="0.3"/>
  <path d="M55 145 Q75 135 95 145" stroke="#073B3A" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="110" cy="108" rx="28" ry="22" fill="#0E625B"/>
  <path d="M82 108 Q60 95 50 88 Q65 98 82 102" fill="#073B3A"/>
  <circle cx="122" cy="102" r="4" fill="#F8F4E8"/>
  <path d="M138 108 L165 100 L138 118 Z" fill="#0E625B"/>
  <path d="M95 125 Q110 135 125 125" stroke="#073B3A" stroke-width="3" stroke-linecap="round"/>
'@

  fish = @'
  <ellipse cx="105" cy="100" rx="55" ry="32" fill="#0E625B"/>
  <path d="M50 100 L28 78 L28 122 Z" fill="#073B3A"/>
  <circle cx="130" cy="95" r="6" fill="#F8F4E8"/>
  <circle cx="132" cy="95" r="3" fill="#073B3A"/>
  <path d="M85 88 Q95 100 85 112" stroke="#E5C77B" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <path d="M105 88 Q115 100 105 112" stroke="#E5C77B" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
'@

  mum = @'
  <circle cx="100" cy="62" r="28" fill="#E5C77B"/>
  <path d="M72 62 Q100 30 128 62" fill="#073B3A"/>
  <ellipse cx="100" cy="130" rx="42" ry="50" fill="#0E625B"/>
  <circle cx="88" cy="58" r="4" fill="#073B3A"/>
  <circle cx="112" cy="58" r="4" fill="#073B3A"/>
  <path d="M92 72 Q100 80 108 72" stroke="#073B3A" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M58 95 Q45 120 52 145" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
  <path d="M142 95 Q155 120 148 145" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
'@

  dad = @'
  <circle cx="100" cy="62" r="28" fill="#DCCBA7"/>
  <ellipse cx="100" cy="130" rx="44" ry="50" fill="#073B3A"/>
  <circle cx="88" cy="58" r="4" fill="#073B3A"/>
  <circle cx="112" cy="58" r="4" fill="#073B3A"/>
  <path d="M92 72 Q100 78 108 72" stroke="#073B3A" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M58 95 Q45 120 40 148" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
  <path d="M142 95 Q155 120 160 148" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
'@

  friend = @'
  <circle cx="72" cy="88" r="22" fill="#E5C77B"/>
  <circle cx="128" cy="88" r="22" fill="#DCCBA7"/>
  <ellipse cx="72" cy="138" rx="28" ry="36" fill="#0E625B"/>
  <ellipse cx="128" cy="138" rx="28" ry="36" fill="#073B3A"/>
  <circle cx="65" cy="85" r="3" fill="#073B3A"/>
  <circle cx="79" cy="85" r="3" fill="#073B3A"/>
  <circle cx="121" cy="85" r="3" fill="#073B3A"/>
  <circle cx="135" cy="85" r="3" fill="#073B3A"/>
  <path d="M68 95 Q72 99 76 95" stroke="#073B3A" stroke-width="2" stroke-linecap="round"/>
  <path d="M124 95 Q128 99 132 95" stroke="#073B3A" stroke-width="2" stroke-linecap="round"/>
  <circle cx="100" cy="115" r="14" fill="#C89B3C"/>
'@

  apple = @'
  <circle cx="100" cy="108" r="48" fill="#C89B3C"/>
  <path d="M100 60 Q108 48 118 52" stroke="#073B3A" stroke-width="3" stroke-linecap="round"/>
  <path d="M118 52 Q128 48 132 58" fill="#0E625B"/>
  <ellipse cx="88" cy="95" rx="12" ry="8" fill="#E5C77B" opacity="0.4"/>
'@

  water = @'
  <path d="M68 70 L68 145 Q68 155 78 155 L122 155 Q132 155 132 145 L132 70 Z" fill="#E5C77B" opacity="0.5" stroke="#0E625B" stroke-width="3"/>
  <path d="M72 95 Q85 88 98 95 Q111 102 124 95" stroke="#0E625B" stroke-width="2" opacity="0.6"/>
  <rect x="72" y="118" width="56" height="32" rx="4" fill="#0E625B" opacity="0.35"/>
'@

  milk = @'
  <path d="M68 70 L68 145 Q68 155 78 155 L122 155 Q132 155 132 145 L132 70 Z" fill="#E5C77B" opacity="0.5" stroke="#0E625B" stroke-width="3"/>
  <rect x="72" y="85" width="56" height="65" rx="4" fill="#F8F4E8"/>
  <path d="M78 100 Q100 95 122 100" stroke="#DCCBA7" stroke-width="2" opacity="0.8"/>
'@

  bread = @'
  <ellipse cx="100" cy="108" rx="58" ry="38" fill="#C89B3C"/>
  <path d="M55 95 Q100 75 145 95" stroke="#E5C77B" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 108 Q100 118 140 108" stroke="#A67B2E" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  <ellipse cx="100" cy="108" rx="58" ry="38" fill="none" stroke="#A67B2E" stroke-width="2" opacity="0.3"/>
'@

  red = @'
  <circle cx="100" cy="100" r="55" fill="#C89B3C"/>
  <circle cx="100" cy="100" r="55" fill="none" stroke="#073B3A" stroke-width="3" opacity="0.2"/>
'@

  blue = @'
  <circle cx="100" cy="100" r="55" fill="#0E625B"/>
  <circle cx="100" cy="100" r="55" fill="none" stroke="#073B3A" stroke-width="3" opacity="0.2"/>
'@

  green = @'
  <circle cx="100" cy="100" r="55" fill="#073B3A"/>
  <circle cx="100" cy="100" r="55" fill="none" stroke="#0E625B" stroke-width="3" opacity="0.4"/>
'@

  yellow = @'
  <circle cx="100" cy="100" r="55" fill="#E5C77B"/>
  <circle cx="100" cy="100" r="55" fill="none" stroke="#C89B3C" stroke-width="3" opacity="0.3"/>
'@

  one = @'
  <text x="100" y="115" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#073B3A">1</text>
  <path d="M100 145 L104 158 L118 158 L107 166 L111 180 L100 172 L89 180 L93 166 L82 158 L96 158 Z" fill="#C89B3C" transform="translate(0,-8) scale(0.7)"/>
'@

  two = @'
  <text x="100" y="115" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#073B3A">2</text>
  <path d="M78 148 L81 158 L91 158 L83 164 L86 174 L78 168 L70 174 L73 164 L65 158 L75 158 Z" fill="#C89B3C"/>
  <path d="M122 148 L125 158 L135 158 L127 164 L130 174 L122 168 L114 174 L117 164 L109 158 L119 158 Z" fill="#C89B3C"/>
'@

  three = @'
  <text x="100" y="115" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="#073B3A">3</text>
  <path d="M68 150 L71 158 L79 158 L73 163 L75 171 L68 166 L61 171 L63 163 L57 158 L65 158 Z" fill="#C89B3C"/>
  <path d="M100 150 L103 158 L111 158 L105 163 L107 171 L100 166 L93 171 L95 163 L89 158 L97 158 Z" fill="#C89B3C"/>
  <path d="M132 150 L135 158 L143 158 L137 163 L139 171 L132 166 L125 171 L127 163 L121 158 L129 158 Z" fill="#C89B3C"/>
'@

  four = @'
  <text x="100" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="68" font-weight="bold" fill="#073B3A">4</text>
  <rect x="52" y="130" width="22" height="22" rx="4" fill="#0E625B"/>
  <rect x="78" y="130" width="22" height="22" rx="4" fill="#C89B3C"/>
  <rect x="104" y="130" width="22" height="22" rx="4" fill="#0E625B"/>
  <rect x="130" y="130" width="22" height="22" rx="4" fill="#C89B3C"/>
'@

  five = @'
  <text x="100" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="68" font-weight="bold" fill="#073B3A">5</text>
  <circle cx="62" cy="148" r="8" fill="#E5C77B" stroke="#C89B3C" stroke-width="2"/>
  <circle cx="82" cy="148" r="8" fill="#E5C77B" stroke="#C89B3C" stroke-width="2"/>
  <circle cx="100" cy="148" r="8" fill="#E5C77B" stroke="#C89B3C" stroke-width="2"/>
  <circle cx="118" cy="148" r="8" fill="#E5C77B" stroke="#C89B3C" stroke-width="2"/>
  <circle cx="138" cy="148" r="8" fill="#E5C77B" stroke="#C89B3C" stroke-width="2"/>
'@

  house = @'
  <rect x="55" y="95" width="90" height="70" rx="4" fill="#DCCBA7" stroke="#C89B3C" stroke-width="2"/>
  <path d="M45 98 L100 45 L155 98 Z" fill="#C89B3C" stroke="#A67B2E" stroke-width="2" stroke-linejoin="round"/>
  <rect x="88" y="125" width="24" height="40" rx="2" fill="#073B3A"/>
  <rect x="62" y="108" width="22" height="22" rx="2" fill="#E5C77B" stroke="#0E625B" stroke-width="2"/>
  <rect x="116" y="108" width="22" height="22" rx="2" fill="#E5C77B" stroke="#0E625B" stroke-width="2"/>
'@

  door = @'
  <rect x="55" y="35" width="90" height="140" rx="6" fill="#C89B3C" stroke="#A67B2E" stroke-width="3"/>
  <rect x="65" y="45" width="70" height="120" rx="4" fill="#DCCBA7"/>
  <circle cx="125" cy="105" r="6" fill="#E5C77B" stroke="#073B3A" stroke-width="2"/>
  <rect x="65" y="45" width="8" height="120" fill="#A67B2E" opacity="0.2"/>
'@

  window = @'
  <rect x="45" y="45" width="110" height="110" rx="6" fill="#DCCBA7" stroke="#073B3A" stroke-width="4"/>
  <rect x="55" y="55" width="90" height="90" rx="2" fill="#E5C77B" opacity="0.6"/>
  <line x1="100" y1="55" x2="100" y2="145" stroke="#073B3A" stroke-width="3"/>
  <line x1="55" y1="100" x2="145" y2="100" stroke="#073B3A" stroke-width="3"/>
  <path d="M60 60 L90 90" stroke="#F8F4E8" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
'@

  chair = @'
  <rect x="62" y="78" width="76" height="12" rx="4" fill="#C89B3C"/>
  <rect x="68" y="90" width="8" height="58" rx="2" fill="#A67B2E"/>
  <rect x="124" y="90" width="8" height="58" rx="2" fill="#A67B2E"/>
  <rect x="78" y="55" width="44" height="50" rx="6" fill="#DCCBA7" stroke="#C89B3C" stroke-width="2"/>
'@

  table = @'
  <rect x="40" y="95" width="120" height="14" rx="4" fill="#C89B3C"/>
  <rect x="52" y="109" width="8" height="48" rx="2" fill="#A67B2E"/>
  <rect x="140" y="109" width="8" height="48" rx="2" fill="#A67B2E"/>
  <rect x="75" y="72" width="28" height="20" rx="2" fill="#0E625B"/>
  <rect x="105" y="78" width="22" height="5" rx="1" fill="#E5C77B" transform="rotate(25 116 80)"/>
'@

  sun = @'
  <circle cx="100" cy="100" r="32" fill="#E5C77B"/>
  <g stroke="#C89B3C" stroke-width="4" stroke-linecap="round">
    <line x1="100" y1="48" x2="100" y2="58"/><line x1="100" y1="142" x2="100" y2="152"/>
    <line x1="48" y1="100" x2="58" y2="100"/><line x1="142" y1="100" x2="152" y2="100"/>
    <line x1="63" y1="63" x2="70" y2="70"/><line x1="130" y1="130" x2="137" y2="137"/>
    <line x1="137" y1="63" x2="130" y2="70"/><line x1="70" y1="130" x2="63" y2="137"/>
  </g>
'@

  moon = @'
  <path d="M115 45 A55 55 0 1 0 115 155 A42 42 0 1 1 115 45 Z" fill="#E5C77B"/>
  <circle cx="130" cy="75" r="6" fill="#DCCBA7" opacity="0.5"/>
  <circle cx="120" cy="110" r="4" fill="#DCCBA7" opacity="0.4"/>
'@

  star = @'
  <path d="M100 42 L112 78 L150 78 L119 98 L131 134 L100 112 L69 134 L81 98 L50 78 L88 78 Z" fill="#E5C77B" stroke="#C89B3C" stroke-width="2" stroke-linejoin="round"/>
'@

  tree = @'
  <rect x="90" y="118" width="20" height="42" rx="4" fill="#A67B2E"/>
  <circle cx="100" cy="88" r="42" fill="#0E625B"/>
  <circle cx="78" cy="98" r="28" fill="#073B3A" opacity="0.5"/>
  <circle cx="122" cy="98" r="28" fill="#073B3A" opacity="0.5"/>
'@

  flower = @'
  <line x1="100" y1="155" x2="100" y2="105" stroke="#0E625B" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="82" cy="130" rx="14" ry="8" fill="#073B3A" transform="rotate(-30 82 130)"/>
  <ellipse cx="118" cy="130" rx="14" ry="8" fill="#073B3A" transform="rotate(30 118 130)"/>
  <circle cx="100" cy="88" r="14" fill="#C89B3C"/>
  <circle cx="78" cy="78" r="16" fill="#C89B3C" opacity="0.85"/>
  <circle cx="122" cy="78" r="16" fill="#C89B3C" opacity="0.85"/>
  <circle cx="72" cy="98" r="16" fill="#C89B3C" opacity="0.85"/>
  <circle cx="128" cy="98" r="16" fill="#C89B3C" opacity="0.85"/>
'@

  rain = @'
  <ellipse cx="100" cy="72" rx="48" ry="28" fill="#DCCBA7"/>
  <ellipse cx="78" cy="78" rx="28" ry="20" fill="#F8F4E8" opacity="0.5"/>
  <line x1="72" y1="105" x2="68" y2="130" stroke="#0E625B" stroke-width="3" stroke-linecap="round"/>
  <line x1="92" y1="108" x2="88" y2="138" stroke="#0E625B" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="105" x2="108" y2="130" stroke="#0E625B" stroke-width="3" stroke-linecap="round"/>
  <line x1="132" y1="108" x2="128" y2="138" stroke="#0E625B" stroke-width="3" stroke-linecap="round"/>
'@

  cloud = @'
  <ellipse cx="100" cy="105" rx="55" ry="32" fill="#F8F4E8"/>
  <ellipse cx="68" cy="98" rx="28" ry="24" fill="#F8F4E8"/>
  <ellipse cx="132" cy="98" rx="28" ry="24" fill="#F8F4E8"/>
  <ellipse cx="85" cy="88" rx="22" ry="20" fill="#F8F4E8"/>
  <ellipse cx="115" cy="88" rx="22" ry="20" fill="#F8F4E8"/>
  <path d="M50 115 Q100 125 150 115" stroke="#DCCBA7" stroke-width="2" fill="none" opacity="0.5"/>
'@

  hand = @'
  <path d="M78 145 Q75 120 82 95 Q88 75 95 72 Q98 85 98 100 L98 145 Z" fill="#E5C77B"/>
  <path d="M98 145 L98 68 Q102 55 108 58 Q112 70 112 88 L112 145 Z" fill="#DCCBA7"/>
  <path d="M112 145 L112 75 Q116 62 122 65 Q126 78 126 95 L126 145 Z" fill="#E5C77B"/>
  <path d="M126 145 L126 82 Q130 72 136 75 Q140 88 140 102 L140 145 Z" fill="#DCCBA7"/>
  <path d="M140 145 L140 90 Q145 82 150 88 Q152 98 152 108 L152 145 Z" fill="#E5C77B"/>
  <rect x="72" y="142" width="88" height="18" rx="8" fill="#C89B3C"/>
'@

  eye = @'
  <ellipse cx="100" cy="100" rx="55" ry="38" fill="#F8F4E8" stroke="#DCCBA7" stroke-width="3"/>
  <circle cx="100" cy="100" r="22" fill="#073B3A"/>
  <circle cx="100" cy="100" r="10" fill="#0E625B"/>
  <circle cx="108" cy="92" r="5" fill="#F8F4E8" opacity="0.8"/>
'@

  nose = @'
  <ellipse cx="100" cy="88" rx="38" ry="48" fill="#E5C77B"/>
  <path d="M100 78 Q88 105 100 118 Q112 105 100 78 Z" fill="#DCCBA7" stroke="#C89B3C" stroke-width="2"/>
  <circle cx="82" cy="82" r="4" fill="#073B3A" opacity="0.15"/>
  <circle cx="118" cy="82" r="4" fill="#073B3A" opacity="0.15"/>
'@

  ear = @'
  <path d="M55 100 Q55 55 85 48 Q75 75 78 105 Q68 115 55 100 Z" fill="#E5C77B"/>
  <path d="M62 98 Q62 68 82 62 Q76 82 78 102 Q70 108 62 98 Z" fill="#C89B3C" opacity="0.5"/>
  <path d="M145 100 Q145 55 115 48 Q125 75 122 105 Q132 115 145 100 Z" fill="#DCCBA7"/>
  <path d="M138 98 Q138 68 118 62 Q124 82 122 102 Q130 108 138 98 Z" fill="#C89B3C" opacity="0.4"/>
'@

  heart = @'
  <path d="M100 155 C55 120 35 95 50 72 C62 55 82 58 100 78 C118 58 138 55 150 72 C165 95 145 120 100 155 Z" fill="#C89B3C" stroke="#A67B2E" stroke-width="2"/>
'@

  eat = @'
  <circle cx="100" cy="58" r="22" fill="#E5C77B"/>
  <ellipse cx="100" cy="118" rx="32" ry="38" fill="#0E625B"/>
  <circle cx="92" cy="55" r="3" fill="#073B3A"/>
  <circle cx="108" cy="55" r="3" fill="#073B3A"/>
  <circle cx="135" cy="95" r="18" fill="#C89B3C"/>
  <path d="M118 95 Q128 98 135 95" stroke="#073B3A" stroke-width="2" stroke-linecap="round"/>
  <path d="M88 68 Q95 75 102 68" stroke="#073B3A" stroke-width="2" stroke-linecap="round"/>
'@

  drink = @'
  <circle cx="100" cy="58" r="22" fill="#DCCBA7"/>
  <ellipse cx="100" cy="118" rx="32" ry="38" fill="#073B3A"/>
  <circle cx="92" cy="55" r="3" fill="#073B3A"/>
  <circle cx="108" cy="55" r="3" fill="#073B3A"/>
  <path d="M128 82 L128 118 Q128 128 118 128 L108 128 Q98 128 98 118 L98 82 Z" fill="#E5C77B" stroke="#0E625B" stroke-width="2"/>
  <rect x="102" y="88" width="20" height="30" rx="2" fill="#0E625B" opacity="0.35"/>
'@

  run = @'
  <circle cx="108" cy="52" r="18" fill="#E5C77B"/>
  <path d="M95 72 Q108 85 115 105" stroke="#0E625B" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path d="M108 85 L85 115" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
  <path d="M115 105 L135 88" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
  <path d="M115 105 L128 135" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
  <path d="M95 72 L72 95" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
'@

  walk = @'
  <circle cx="100" cy="55" r="18" fill="#DCCBA7"/>
  <path d="M100 75 L100 115" stroke="#0E625B" stroke-width="10" stroke-linecap="round"/>
  <path d="M100 90 L78 115" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 90 L122 115" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 115 L88 148" stroke="#073B3A" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 115 L118 148" stroke="#0E625B" stroke-width="8" stroke-linecap="round"/>
  <line x1="55" y1="155" x2="145" y2="155" stroke="#DCCBA7" stroke-width="3" stroke-linecap="round"/>
'@

  sleep = @'
  <rect x="45" y="115" width="110" height="28" rx="8" fill="#C89B3C"/>
  <rect x="40" y="108" width="120" height="14" rx="6" fill="#DCCBA7"/>
  <circle cx="100" cy="88" r="22" fill="#E5C77B"/>
  <path d="M88 88 Q100 82 112 88" stroke="#073B3A" stroke-width="2" fill="none"/>
  <text x="135" y="72" font-family="Georgia, serif" font-size="22" fill="#0E625B">z</text>
  <text x="148" y="58" font-family="Georgia, serif" font-size="18" fill="#0E625B" opacity="0.7">z</text>
'@

  ball = @'
  <circle cx="100" cy="100" r="48" fill="#C89B3C"/>
  <path d="M100 52 Q130 75 100 100 Q70 125 100 148" stroke="#073B3A" stroke-width="3" fill="none" opacity="0.4"/>
  <path d="M52 100 Q75 85 100 100 Q125 115 148 100" stroke="#073B3A" stroke-width="3" fill="none" opacity="0.4"/>
  <ellipse cx="82" cy="82" rx="12" ry="8" fill="#E5C77B" opacity="0.35"/>
'@

  book = @'
  <path d="M55 55 L55 145 Q100 135 145 145 L145 55 Q100 65 55 55 Z" fill="#0E625B"/>
  <path d="M100 58 L100 142" stroke="#073B3A" stroke-width="2"/>
  <path d="M65 75 Q82 72 95 75" stroke="#E5C77B" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M105 75 Q122 72 135 75" stroke="#E5C77B" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M65 95 Q82 92 95 95" stroke="#E5C77B" stroke-width="2" fill="none" opacity="0.6"/>
'@

  car = @'
  <rect x="45" y="95" width="110" height="38" rx="12" fill="#C89B3C"/>
  <path d="M65 95 L78 68 L122 68 L135 95 Z" fill="#0E625B"/>
  <rect x="82" y="72" width="18" height="16" rx="2" fill="#E5C77B" opacity="0.7"/>
  <rect x="102" y="72" width="18" height="16" rx="2" fill="#E5C77B" opacity="0.7"/>
  <circle cx="68" cy="135" r="14" fill="#073B3A"/><circle cx="68" cy="135" r="6" fill="#DCCBA7"/>
  <circle cx="132" cy="135" r="14" fill="#073B3A"/><circle cx="132" cy="135" r="6" fill="#DCCBA7"/>
'@

  school = @'
  <rect x="50" y="85" width="100" height="75" rx="4" fill="#DCCBA7" stroke="#C89B3C" stroke-width="2"/>
  <path d="M40 88 L100 45 L160 88 Z" fill="#073B3A"/>
  <rect x="88" y="115" width="24" height="45" rx="2" fill="#0E625B"/>
  <rect x="58" y="98" width="20" height="18" rx="2" fill="#E5C77B"/>
  <rect x="122" y="98" width="20" height="18" rx="2" fill="#E5C77B"/>
  <line x1="100" y1="45" x2="100" y2="30" stroke="#073B3A" stroke-width="3"/>
  <rect x="96" y="28" width="8" height="6" fill="#C89B3C"/>
'@

  pencil = @'
  <rect x="88" y="45" width="24" height="115" rx="4" fill="#E5C77B" transform="rotate(-12 100 100)"/>
  <path d="M82 52 L108 48 L104 58 L78 62 Z" fill="#C89B3C" transform="rotate(-12 100 100)"/>
  <path d="M88 155 L104 152 L100 162 L84 165 Z" fill="#073B3A" transform="rotate(-12 100 100)"/>
  <rect x="90" y="70" width="20" height="4" fill="#C89B3C" opacity="0.4" transform="rotate(-12 100 100)"/>
'@

  big = @'
  <ellipse cx="75" cy="130" rx="35" ry="28" fill="#0E625B"/>
  <circle cx="75" cy="88" r="22" fill="#073B3A"/>
  <ellipse cx="145" cy="148" rx="12" ry="10" fill="#DCCBA7"/>
  <circle cx="145" cy="138" r="8" fill="#E5C77B"/>
  <text x="100" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#073B3A">BIG</text>
'@

  small = @'
  <ellipse cx="145" cy="125" rx="38" ry="30" fill="#C89B3C"/>
  <circle cx="145" cy="82" r="24" fill="#E5C77B"/>
  <ellipse cx="62" cy="148" rx="14" ry="11" fill="#0E625B"/>
  <circle cx="62" cy="138" r="10" fill="#073B3A"/>
  <text x="100" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#073B3A">small</text>
'@

  happy = @'
  <circle cx="100" cy="100" r="55" fill="#E5C77B" stroke="#C89B3C" stroke-width="3"/>
  <circle cx="82" cy="88" r="6" fill="#073B3A"/>
  <circle cx="118" cy="88" r="6" fill="#073B3A"/>
  <path d="M72 112 Q100 138 128 112" stroke="#073B3A" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="72" cy="105" r="8" fill="#C89B3C" opacity="0.25"/>
  <circle cx="128" cy="105" r="8" fill="#C89B3C" opacity="0.25"/>
'@
}

$mathSvgs = @{
  apple = @'
  <circle cx="32" cy="36" r="18" fill="#C89B3C"/>
  <path d="M32 18 Q36 12 42 14" stroke="#073B3A" stroke-width="2" stroke-linecap="round"/>
  <path d="M42 14 Q46 12 48 16" fill="#0E625B"/>
'@

  star = @'
  <path d="M32 10 L36 24 L50 24 L39 33 L43 47 L32 38 L21 47 L25 33 L14 24 L28 24 Z" fill="#E5C77B" stroke="#C89B3C" stroke-width="1.5" stroke-linejoin="round"/>
'@

  block = @'
  <rect x="14" y="22" width="36" height="36" rx="5" fill="#0E625B"/>
  <rect x="18" y="26" width="28" height="8" rx="2" fill="#073B3A" opacity="0.3"/>
'@

  ball = @'
  <circle cx="32" cy="32" r="20" fill="#C89B3C"/>
  <path d="M32 12 Q44 22 32 32 Q20 42 32 52" stroke="#073B3A" stroke-width="2" fill="none" opacity="0.35"/>
  <ellipse cx="24" cy="24" rx="6" ry="4" fill="#E5C77B" opacity="0.35"/>
'@

  animal = @'
  <ellipse cx="32" cy="38" rx="16" ry="10" fill="#E5C77B"/>
  <circle cx="32" cy="26" r="12" fill="#C89B3C"/>
  <path d="M22 22 L18 14 L26 20 Z" fill="#C89B3C"/>
  <path d="M42 22 L46 14 L38 20 Z" fill="#C89B3C"/>
  <circle cx="28" cy="25" r="2" fill="#073B3A"/>
  <circle cx="36" cy="25" r="2" fill="#073B3A"/>
'@

  shape = @'
  <rect x="12" y="28" width="18" height="18" rx="3" fill="#0E625B"/>
  <circle cx="44" cy="37" r="10" fill="#C89B3C"/>
  <path d="M28 14 L38 14 L33 24 Z" fill="#E5C77B"/>
'@
}

$vocabCount = 0
foreach ($id in $svgs.Keys) {
  $path = Join-Path $vocabDir "$id.svg"
  Wrap-Vocab $svgs[$id] | Set-Content -Path $path -Encoding UTF8 -NoNewline
  $vocabCount++
}

$mathCount = 0
foreach ($id in $mathSvgs.Keys) {
  $path = Join-Path $mathDir "$id.svg"
  Wrap-Math $mathSvgs[$id] | Set-Content -Path $path -Encoding UTF8 -NoNewline
  $mathCount++
}

Write-Output "Vocabulary SVGs: $vocabCount"
Write-Output "Math icon SVGs: $mathCount"
Write-Output "Total: $($vocabCount + $mathCount)"
