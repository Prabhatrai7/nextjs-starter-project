import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://media.istockphoto.com/photos/houston-texas-skyline-picture-id542727462?k=20&m=542727462&s=612x612&w=0&h=IEniubJHnYgeDJVnFBY8M-Nru8igOtNybGSqcU25q-4=',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://media.istockphoto.com/photos/houston-texas-skyline-picture-id542727462?k=20&m=542727462&s=612x612&w=0&h=IEniubJHnYgeDJVnFBY8M-Nru8igOtNybGSqcU25q-4=',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a second meetup!'
//     },
//     {
//         id: 'm3',
//         title: 'A Third Meetup',
//         image: 'https://media.istockphoto.com/photos/houston-texas-skyline-picture-id542727462?k=20&m=542727462&s=612x612&w=0&h=IEniubJHnYgeDJVnFBY8M-Nru8igOtNybGSqcU25q-4=',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a third meetup!'
//     },
// ]

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React Meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://prabhat7:Prabhat12@cluster0.xmqtjnw.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }

export default HomePage;