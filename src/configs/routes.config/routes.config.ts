import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: `${APP_PREFIX_PATH}/home`,
        component: lazy(() => import('@/views/DashBoard/Home')),
        authority: [],
    },
    {
        key: 'details',
        path: `${APP_PREFIX_PATH}/details`,
        component: lazy(() => import('@/views/DetailForm')),
        authority: [],
        meta: {
            header: 'Sponsor Details',
            headerContainer: true,
        },
    },
    {
        key: 'sponsorships',
        path: `${APP_PREFIX_PATH}/sponsorships`,
        component: lazy(() => import('@/views/Sponsorships/SponsorShips')),
        authority: [],
        meta: {
            header: 'Sponsorships',
            headerContainer: true,
        },
    },
    {
        key: 'sponsors',
        path: `${APP_PREFIX_PATH}/sponsors`,
        component: lazy(() => import('@/views/Sponsors/Sponsors')),
        authority: [],
        meta: {
            header: 'Sponsors',
            headerContainer: true,
        },
    },
    {
        key: 'children',
        path: `${APP_PREFIX_PATH}/children`,
        component: lazy(() => import('@/views/Children/Children')),
        authority: [],
        meta: {
            header: 'Chiildren',
            headerContainer: true,
        },
    },
    {
        key: 'caretaker',
        path: `${APP_PREFIX_PATH}/caretaker`,
        component: lazy(() => import('@/views/CareTaker/CareTaker')),
        authority: [],
        meta: {
            header: 'Chiildren',
            headerContainer: true,
        },
    },
    {
        key: 'add-sponsorship',
        path: `${APP_PREFIX_PATH}/sponsorships/add-new`,
        component: lazy(
            () => import('@/views/Sponsorships/SponsorShipForm/index')
        ),
        authority: [],
        meta: {
            header: 'Add New Sponsorship',
            headerContainer: true,
        },
    },
]
