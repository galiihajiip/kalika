export function detectLanguageHint(text: string): string {
  if (/[\u0600-\u06FF]/.test(text)) return 'Arabic'
  if (/[\u4E00-\u9FFF]/.test(text)) return 'Chinese (Mandarin)'
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'Japanese'
  if (/[\uAC00-\uD7AF]/.test(text)) return 'Korean'
  if (/[\u0E00-\u0E7F]/.test(text)) return 'Thai'
  if (/[\u0400-\u04FF]/.test(text)) return 'Russian'
  if (/[\u0900-\u097F]/.test(text)) return 'Hindi'
  if (/[\u0600-\u06FF\u0750-\u077F]/.test(text)) return 'Arabic'
  
  // Latin script language detection
  const words = text.toLowerCase().split(/\s+/)
  
  const markers: Record<string, string[]> = {
    'Indonesian': ['yang','adalah','dengan','untuk','pada','tidak',
                   'dari','dan','ini','itu','juga','sudah','akan',
                   'bisa','saya','kami','kita','mereka','sangat'],
    'Spanish':    ['que','de','la','el','en','los','es','se','del','las'],
    'French':     ['que','de','la','le','en','les','est','se','des','une'],
    'German':     ['die','der','das','ist','ein','eine','und','mit','von'],
    'Portuguese': ['que','de','da','do','em','os','as','uma','com','não'],
    'Italian':    ['che','di','la','il','in','gli','è','si','del','una'],
  }
  
  let bestLang  = 'English'
  let bestScore = 0.05  // minimum threshold
  
  for (const [lang, wordList] of Object.entries(markers)) {
    const score = words.filter(w => wordList.includes(w)).length / words.length
    if (score > bestScore) {
      bestScore = score
      bestLang  = lang
    }
  }
  
  return bestLang
}
