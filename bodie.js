const apiKey = ''; // Replace with your YouTube API key
const channelId = 'UCe8x5iUg2640oi_JbnCm7Ng';  // Replace with the YouTube channel ID

const flipClockTens = document.getElementById('flip-clock-tens');
const flipClockOnes = document.getElementById('flip-clock-ones');

// Function to fetch the subscriber count from the YouTube API
async function getSubscriberCount() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.items[0].statistics.subscriberCount;
}

async function getSubscriberCountExact() {
    const url = `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.est_sub) {
            const subs = data.est_sub;
            console.log(subs);
            return subs;
        }
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
    }
}

async function getRandomFillerNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
}

function updateFlipClock(count) {
    // Ensure the count has exactly 6 digits (pad with leading zeros if necessary)
    const countStr = count.toString().padStart(6, '0');

    // Update each digit by comparing it with the current value
    const digits = [
        { element: document.getElementById('flip-clock-thousands'), value: countStr[0] },
        { element: document.getElementById('flip-clock-hundreds'), value: countStr[1] },
        { element: document.getElementById('flip-clock-tens'), value: countStr[2] },
        { element: document.getElementById('flip-clock-ones'), value: countStr[3] },
        { element: document.getElementById('flip-clock-tenth'), value: countStr[4] },
        { element: document.getElementById('flip-clock-hundredth'), value: countStr[5] }
    ];

    digits.forEach(digit => {
        const { element, value } = digit;
        if (element.textContent !== value) {
            element.classList.add('flip');
            setTimeout(() => {
                element.textContent = value;
                element.classList.remove('flip');
            }, 300);
        }
    });
}

// Function to fetch and update the subscriber count every second
async function refreshSubscriberCount() {
    try {
        const subscriberCount = await getSubscriberCountExact();
        // const subscriberCount = await getRandomFillerNumber();
        updateFlipClock(subscriberCount);
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
    }
}

// Initial load
refreshSubscriberCount();

// Set interval to refresh every second
setInterval(refreshSubscriberCount, 10000);
