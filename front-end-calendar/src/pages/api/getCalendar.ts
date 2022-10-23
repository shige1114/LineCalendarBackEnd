

export const getCalendar = (ym: string) => {
    const [y, m] = ym.split('-').map((x) => {
        return Number(x)
    })
    const result = []
    const startDate = new Date(y, m - 1, 1)
    const endDate = new Date(y, m, 0)
    let dayCount = 0
    for (let w = 0; w < 6; w++) {
        let week = []
        for (let d = 0; d < 7; d++) {
            if (dayCount >= endDate.getDate()) {
                week.push(0)
            } else {
                ((w == 0 && d < startDate.getDate())) ? week.push(0) : week.push(dayCount += 1)
            }
        }
        result.push(week)
        if (dayCount >= endDate.getDate()) break

    }
    return result
}