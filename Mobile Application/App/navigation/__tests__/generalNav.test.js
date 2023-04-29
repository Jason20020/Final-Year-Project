import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { GeneralNavigator } from '../generalNav'


describe('General Stack Navigation testing', () => {

    test('Renders the home screen', () => {
        const { getByTestId } = render(<GeneralNavigator />);
        expect(getByTestId('generalHome')).toBeTruthy();
    });

    test('Navigate to login screen testing', () => {
        const { getByTestId } = render(<GeneralNavigator />);
        const button = getByTestId('loginButton');

        fireEvent.press(button);
        expect(getByTestId('generalLogin')).toBeTruthy();
    });

    test('Navigate to signUp screen testing', () => {
        const { getByTestId } = render(<GeneralNavigator />);
        const button = getByTestId('signUpButton');

        fireEvent.press(button);
        expect(getByTestId('generalSignUp')).toBeTruthy();
    });
});