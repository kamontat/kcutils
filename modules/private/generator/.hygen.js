const toSafeName = s => s.replace(/ /g, "-").toLowerCase()
const toNamespace = s => {
  if (s === "private") return "kcprivate"
  else if (s === "internal") return "kcinternal"
  else if (s === "public") return "kcutils"
  else return ""
}
const toModuleName = (type, name) => `@${toNamespace(type)}/${toSafeName(name)}`

module.exports = {
  helpers: {
      toSafeName,
      toNamespace,
      toModuleName
  }
}
