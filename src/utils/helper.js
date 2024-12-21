export function getXps(module_xps) {
  return module_xps.reduce((acc, xp) => {
    const pathKey = xp.event.path.split("/").pop()
    if (!acc[pathKey]) {
      acc[pathKey] = 0
    }
    acc[pathKey] += xp.amount
    return acc
  }, {})
}
