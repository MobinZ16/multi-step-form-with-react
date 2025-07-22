import type {Plan, AddOn} from './types';

export const plans: Plan[] = [
    {
        type: 'Arcade',
        priceMonthly: 9,
        priceYearly: 90,
    },
    {
        type: 'Advanced',
        priceMonthly: 12,
        priceYearly: 120,
    },
    {
        type: 'Pro',
        priceMonthly: 15,
        priceYearly: 150,
    },
];

export const addons: AddOn[] = [
    {
        id: 'online-service',
        name: 'Online service',
        description: 'Access to multiplayer games',
        priceMonthly: 1,
        priceYearly: 10,
    },
    {
        id: 'larger-storage',
        name: 'Larger Storage',
        description: 'Extra 1TB of cloud save',
        priceMonthly: 2,
        priceYearly: 20,
    },
    {
        id: 'customizable-profile',
        name: 'Customizable Profile',
        description: 'Custom profile picture and username',
        priceMonthly: 2,
        priceYearly: 20,
    },
];

export const addOns: AddOn[] = [
    {
        id: 'online-service',
        name: 'Online service',
        description: 'Access to multiplayer games',
        priceMonthly: 1,
        priceYearly: 10,
    },
    {
        id: 'larger-storage',
        name: 'Larger Storage',
        description: 'Extra 1TB of cloud save',
        priceMonthly: 2,
        priceYearly: 20,
    },
    {
        id: 'customizable-profile',
        name: 'Customizable Profile',
        description: 'Custom profile picture and username',
        priceMonthly: 2,
        priceYearly: 20,
    },
];