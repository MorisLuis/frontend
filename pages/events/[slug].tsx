import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Layout } from '../../components/Layouts/Layout'
import { EventDetails } from '../../components/EventDetails'
import { Event } from '../../interfaces/Event'
import { FunctionInterface } from '../../interfaces/Function'
import { getEvent } from '../../services/events'

interface Props {

    event: Event
    functions: FunctionInterface[]
}

const EventDetailsPage: FC<Props> = ({ event, functions }) => {

    return (
        <Layout image={event.image} description={event.description} title={event.name}>
            <EventDetails serverFunctions={functions} serverEvent={event} />
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
            event: data.event,
            functions: data.functions
        }
    }


}