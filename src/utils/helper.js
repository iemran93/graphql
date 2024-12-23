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

export function getRecent(progressData) {
  const grade = parseFloat(progressData.grade.toFixed(2))
  const updatedAt = progressData.updatedAt.split("T")[0]
  return {
    grade: grade,
    "updated at": updatedAt,
    path: progressData.path,
  }
}

export function getProgress(progressTime) {
  console.log(progressTime)
  const progressTimeData = progressTime.map((item) => {
    return { amount: item.amount, name: item.object.name }
  })
  return progressTimeData
}
