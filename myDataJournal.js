class DataEntry {
    day; // Day of the week.
    sleepHours; // In hours.
    screenTime; // In hours.
    mood;
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
var Mood;
(function (Mood) {
    Mood[Mood["Good"] = 0] = "Good";
    Mood[Mood["Great"] = 1] = "Great";
    Mood[Mood["Okay"] = 2] = "Okay";
    Mood[Mood["Bad"] = 3] = "Bad";
})(Mood || (Mood = {}));
let weekData = [
    new DataEntry("Sunday", 12, 6, Mood.Great, 0, 9),
    new DataEntry("Monday", 7, 16, Mood.Good, 0, 6),
    new DataEntry("Tuesday", 8, 14, Mood.Okay, 1, 8),
    new DataEntry("Wednesday", 8, 12, Mood.Good, 1, 6),
    new DataEntry("Thursday", 6, 17, Mood.Bad, 2, 4),
    new DataEntry("Friday", 9, 12, Mood.Great, 2, 6),
    new DataEntry("Saturday", 8, 12, Mood.Great, 0, 6),
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
function mostFrequentMood() {
    let entries = [0, 0, 0, 0]; // Good, Great, Okay, Bad
    weekData.forEach(entry => {
        entries[entry.mood]++;
    });
    let mostCommonOrdinal = -1;
    let mostCommonCount = 0;
    // You could use the reduce function with an accumulator here. In fact, I did it!
    // const mostCommonOrdinal = entries.reduce((maxIdx, count, idx, arr) => count > arr[maxIdx] ? idx : maxIdx, 0);
    // It sucks.
    for (let i = 0; i < entries.length; i++) {
        if (entries[i] > mostCommonCount) {
            mostCommonCount = entries[i];
            mostCommonOrdinal = i;
        }
    }
    return Mood[mostCommonOrdinal]; // I'm not exactly sure why this works. It does, though.
}
// Not my best work.
function correlateCaffeineToFocus() {
    const withCaffeine = weekData.filter(e => e.caffeineIntake > 0);
    const withoutCaffeine = weekData.filter(e => e.caffeineIntake === 0);
    const avgWith = withCaffeine.reduce((sum, e) => sum + e.focusLevel, 0) / withCaffeine.length;
    const avgWithout = withoutCaffeine.reduce((sum, e) => sum + e.focusLevel, 0) / withoutCaffeine.length;
    return avgWith > avgWithout;
}
function analyzeData() {
    const highestScreenTimeEntry = findHighestScreenTime();
    console.log(`Most screen time: ${highestScreenTimeEntry.day} with ${highestScreenTimeEntry.screenTime} hours.`);
    console.log(`Average sleep over the week: ${averageSleep().toFixed(1)} hours.`);
    console.log(`Most frequent mood: ${mostFrequentMood()}`);
    console.log(`Does more caffeine mean better focus? ${correlateCaffeineToFocus() ? "Yep." : "...not really."}`);
}
/**
 * Prediction: Most screen time was Thursday, best focus day was Sunday, and caffeine... sometimes helps.
 */
analyzeData();
