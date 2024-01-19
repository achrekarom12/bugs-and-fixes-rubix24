import React, { useState, useEffect } from 'react';

function TweetsAnalysis() {
    const [selectedTweet, setSelectedTweet] = useState({});
    const [city, setCity] = useState('');
    const [prediction, setPrediction] = useState('');
    const [subs, setSubs] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const tweets = [
        {
            "id": 18,
            "created_at": "2024-01-18T20:55:00Z",
            "text": "Incredible match today! The competition was tough, but we gave our best. #SportsHero #MatchDay",
            "user": {
                "id": 4444,
                "screen_name": "SuperAthlete2"
            },
            "hashtags": ["#SportsHero", "#MatchDay"],
            "mentions": ["@SportsAssociation", "@FanClub"],
            "retweet_count": 28,
            "favorite_count": 60,
            "coordinates": null,
            "place": null,
            "source": "Twitter Web App"
        },
        {
            "id": 18,
            "created_at": "2024-01-18T20:55:00Z",
            "text": "Incredible match today! The competition was tough, but we gave our best. #SportsHero #MatchDay",
            "user": {
                "id": 4444,
                "screen_name": "SuperAthlete2"
            },
            "hashtags": ["#SportsHero", "#MatchDay"],
            "mentions": ["@SportsAssociation", "@FanClub"],
            "retweet_count": 28,
            "favorite_count": 60,
            "coordinates": null,
            "place": null,
            "source": "Twitter Web App"
        },
        {
            "id": 16,
            "created_at": "2024-01-18T18:30:00Z",
            "text": "Strong earthquake shakes Mumbai. Residents urged to stay indoors and follow safety guidelines. #MumbaiEarthquake #SafetyFirst",
            "user": {
                "id": 2222,
                "screen_name": "MumbaiSafety"
            },
            "hashtags": ["#MumbaiEarthquake", "#SafetyFirst"],
            "mentions": ["@MumbaiDisasterMgmt", "@ndmaindia"],
            "retweet_count": 25,
            "favorite_count": 50,
            "coordinates": {
                "latitude": 19.0760,
                "longitude": 72.8777
            },
            "place": {
                "id": "place16",
                "name": "CityCenter",
                "full_name": "CityCenter, India",
                "country": "India"
            },
            "source": "Twitter for Android"
        },
        {
            "id": 19,
            "created_at": "2024-01-18T22:10:00Z",
            "text": "Celebrating a great win with the team! Thanks to all the fans for the support. #TeamSpirit #VictoryCelebration",
            "user": {
                "id": 5555,
                "screen_name": "ChampionAthlete3"
            },
            "hashtags": ["#TeamSpirit", "#VictoryCelebration"],
            "mentions": ["@TeamFanatics", "@SportsMedia"],
            "retweet_count": 35,
            "favorite_count": 70,
            "coordinates": null,
            "place": null,
            "source": "Twitter for Android"
        },
        {
            "id": 20,
            "created_at": "2024-01-18T23:25:00Z",
            "text": "Fantastic game! Grateful for the support from fans and teammates. #GameDayThrills #SportsEnthusiast",
            "user": {
                "id": 6666,
                "screen_name": "SportsFanatic4"
            },
            "hashtags": ["#GameDayThrills", "#SportsEnthusiast"],
            "mentions": ["@SportsArena", "@FanFavourite"],
            "retweet_count": 40,
            "favorite_count": 75,
            "coordinates": null,
            "place": null,
            "source": "Twitter Web App"
        }
    ];

    const selectTweet = (tweet) => {
        setSelectedTweet(tweet);
    };

    const formatTimeCreated = (timeCreated) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(timeCreated).toLocaleDateString('en-US', options);
    };

    const sendDataToServer = () => {
        const currentTweet = currentTweets[currentTweets.length - 1];
        if (currentTweet) {
            // Replace with your Flask server endpoint
            const serverEndpoint = 'http://127.0.0.1:8080/predictFromTweets';
    
            // Example of using fetch to send data to the server
            fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentTweet),
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the server response as needed
                    console.log('Server Response:', data);
                    const disasterTypes = ["Earthquake", "Flood", "Tsunami", "Landslide", "Avalanche", "Cyclone", "Forest Fire"];
                    // Check if data.city exists and is in the disasterTypes array
                    if (data.city && disasterTypes.includes(data.predicted_disaster)) {
                        // Call the API for sending email notifications
                        getSubs(data.city);
                        sendNotificationAPI(data.city);
                        // Use data.city directly in getSubs
                        
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('No tweets available to send to the server.');
        }
    };
    
    const sendNotificationAPI = (city) => {
        // Replace with your Flask server endpoint for sending email notifications
        const params = new URLSearchParams({ location: city });
        const emailEndpoint = `http://127.0.0.1:8080/sendNotification?${params}`;
    
        // Example of using fetch to send data to the server
        fetch(emailEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the server response for email notifications
                console.log('Email Notification Response:', data);
                setEmailSent(true);
            })
            .catch(error => console.error('Error:', error));
    };
    

    const getSubs = (city) => {
        // Replace with your Flask server endpoint
        // const serverEndpoint2 = `http://127.0.0.1:8080/getSubs?location=${city}`;

        const params = new URLSearchParams({ location: city });
        const serverEndpoint2 = `http://127.0.0.1:8080/getSubs?${params}`;


        // Example of using fetch to send data to the server
        fetch(serverEndpoint2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the server response as needed
                console.log('Server Response:', data);
                setSubs(data.count);
            })
            .catch(error => console.error('Error:', error));
    };


    const [currentTweets, setCurrentTweets] = useState([]);
    const [tweetIndex, setTweetIndex] = useState(0);

    useEffect(() => {
        if (tweetIndex < tweets.length) {
            const intervalId = setInterval(() => {
                setCurrentTweets((prevTweets) => [...prevTweets, tweets[tweetIndex]]);
                setTweetIndex((prevIndex) => prevIndex + 1);
                sendDataToServer();

            }, 5000); // Add a new tweet every 20 seconds

            return () => clearInterval(intervalId); // Clear interval on component unmount
        }
    }, [tweetIndex]);

    return (
        <div className="flex flex-row gap-10 justify-between p-8 h-[500px]">
            <div className=" bg-white overflow-y-auto rounded-md p-3 shadow-2xl w-[625px]">
                <h2 className="text-2xl font-bold mb-4 text-center">Realtime Tweets</h2>
                {currentTweets.map((tweet, index) => (
                    <div key={index} className="border-1 rounded-md bg-slate-200 mb-2 p-2  shadow-md" onClick={() => selectTweet(tweet)} >
                        <h3 className='font-semibold'>{tweet.user.screen_name}</h3>
                        <p>{tweet.text}</p>
                        <p className='text-sm font-semibold'>{formatTimeCreated(tweet.created_at)}</p>
                    </div>
                ))}
            </div>
            <div className='flex flex-col'>
                <div className="flex-1 bg-white overflow-y-auto rounded-md p-3 w-[625px] shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-center">Alert Notification</h2>
                    {subs && <h3 className='font-semibold border-1 shadow-md p-2 rounded-md bg-slate-200 mb-2'>There are {subs} individuals in subscribers list who are in the close 
                    proximity of the disaster. <br /> Sending them alert notifications...</h3>}
                    {emailSent && <h3 className='font-semibold border-1 shadow-md p-2 rounded-md bg-slate-200 mb-2'>✅ Email notification has been sent to the subscribers.</h3>}
                    {emailSent && <h3 className='font-semibold border-1 shadow-md p-2 rounded-md bg-slate-200 mb-2'>Suggest next steps...</h3>}
                </div>
            </div>
        </div>
    );
}

export default TweetsAnalysis;