class DataEntry {
    day; // Day of the week.
    sleepHours; // In hours.
    screenTime; // In hours.
    mood; // "Great", "Good", "Okay", "Bad"
    caffeineIntake; // Cups
    focusLevel; // 1-10 scale
    constructor(day, sleepHours, screenTime, mood, caffeineIntake, focusLevel) {
        if (sleepHours + screenTime > 24) {
            throw new Error("Total hours of sleep and screen time cannot exceed 24 hours.");
        }
        if (focusLevel < 1 || focusLevel > 10) {
            throw new Error("Focus level must be between 1 and 10.");
        }
        this.day = day;
        this.sleepHours = sleepHours;
        this.screenTime = screenTime;
        this.mood = mood;
        this.caffeineIntake = caffeineIntake;
        this.focusLevel = focusLevel;
    }
}
// Most screen time was Thursday, best focus day was Sunday, and caffeine... sometimes helps.
let weekData = [
    new DataEntry("Sunday", 12, 6, "Great", 0, 9),
    new DataEntry("Monday", 7, 16, "Good", 0, 6),
    new DataEntry("Tuesday", 8, 14, "Okay", 1, 8),
    new DataEntry("Wednesday", 8, 12, "Good", 1, 6),
    new DataEntry("Thursday", 6, 17, "Okay", 2, 6),
    new DataEntry("Friday", 9, 12, "Great", 2, 6),
    new DataEntry("Saturday", 8, 12, "Great", 0, 6),
];
function findHighestScreenTime() {
    // a classic reduce function to find the entry with the highest screen time
    return weekData.reduce((x, y) => {
        return x.screenTime > y.screenTime ? x : y;
    });
}
function averageSleep() {
    const totalSleep = weekData.reduce((sum, entry) => sum + entry.sleepHours, 0);
    return totalSleep / weekData.length;
}
function analyzeData() {
    const highestScreenTimeEntry = findHighestScreenTime();
    const avgSleep = averageSleep();
    console.log(`Most screen time: ${highestScreenTimeEntry.day} with ${highestScreenTimeEntry.screenTime} hours.`);
    console.log(`Average sleep over the week: ${avgSleep.toFixed(1)} hours.`);
}
analyzeData();
