import { technologies, technicalSkills } from "./skills"

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
  const progressTimeData = progressTime.map((item) => {
    return { amount: item.amount, name: item.object.name }
  })
  return progressTimeData
}

export function getSkillsData(skills) {
  // create an object containing the items in skills list (technologies)
  // and add the amount to it if above != 0
  // need to get the total project for a skill to normalize the count value
  // count / max
  const technicalSkillsData = skills
    .map((item) => {
      let count = item.transactions_aggregate.aggregate.count
      if (technicalSkills.includes(item.type) && count > 0) {
        return { type: item.type.split("_")[1].toUpperCase(), count: count }
      }
    })
    .filter((item) => item !== undefined)

  const technologiessData = skills
    .map((item) => {
      let count = item.transactions_aggregate.aggregate.count
      if (technologies.includes(item.type) && count > 0) {
        return { type: item.type.split("_")[1].toUpperCase(), count: count }
      }
    })
    .filter((item) => item !== undefined)
  console.log(technicalSkillsData, technologiessData)
  return { technicalSkillsData, technologiessData }
}
