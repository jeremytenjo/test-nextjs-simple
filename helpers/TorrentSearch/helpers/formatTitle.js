const stringToremove = [
  'iNTERNAL',
  'BDRip',
  'x264-TABULARiA',
  'YIFY',
  '-',
  '1080',
  'x264',
  'subbed',
  'BluRay',
  'Mkv',
  'AC3',
  'x265',
  'multisub',
  'HDrip',
  'H264',
  'English',
  'Original',
  new Date().getFullYear().toString()
]
export default (title) => {
  let formatTitle = title.replace(/ *\([^)]*\) */g, ' ')
  formatTitle = formatTitle.replace(/ *\[[^\]]*]/g, ' ')
  formatTitle = formatTitle.replace(/\./g, ' ')

  stringToremove.map((string) => {
    const hasString = formatTitle.includes(string)
    if (hasString) {
      let titleSplit = formatTitle.split(string)
      formatTitle = titleSplit[0]
    }
  })

  formatTitle = formatTitle.trim()

  return formatTitle
}
