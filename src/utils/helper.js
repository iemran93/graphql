import { technologies, technicalSkills } from "./skills"

export function getXpsGrouped(module_xps) {
  return module_xps.reduce((acc, transaction) => {
    const name = transaction.event.object.name
    acc[name] = (acc[name] || 0) + transaction.amount
    return acc
  }, {})
}

export function getRecent(progressData) {
  const grade = parseFloat(progressData.grade?.toFixed(2))
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
  const processSkills = (referenceList) =>
    skills
      .map((item) => {
        let count = item.transactions_aggregate.aggregate.count
        if (referenceList.includes(item.type) && count > 0) {
          return {
            type: item.type.split("_")[1].toUpperCase(),
            count: count,
          }
        }
      })
      .filter((item) => item !== undefined)

  const technicalSkillsData = processSkills(technicalSkills)

  const technologiessData = processSkills(technologies)

  return { technicalSkillsData, technologiessData }
}
