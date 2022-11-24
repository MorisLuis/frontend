import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Layout } from '../../components'
import { EventDetails } from '../../components/EventDetails'
import { Event } from '../../interfaces/Event'
import { getEvent } from '../../services/events'

interface Props {

    event: Event
}

const EventDetailsPage: FC<Props> = ({ event }) => {

    console.log({ event });

    return (
        <Layout>
            <EventDetails serverEvent={event} />
        </Layout>
    )
}

export default EventDetailsPage


export const getServerSideProps: GetServerSideProps = async ({ params }) => {


    let data
    try {
        data = await getEvent(params?.slug as string)
    } catch (error) {

    }

    return {
        props: {
            event: data.event
        }
    }


}