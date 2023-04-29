import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { create } from 'react-test-renderer';

import Home from '../Home';

describe('General Home Components Testing', () => {
    it('Home renders correctly', () => {
      const tree = renderer.create(
        <Home />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('Check General Home Components', async () => {
        const { findByTestId } = render(<Home />);
        const generalHome = await findByTestId('generalHome'); 
        const loginButton = await findByTestId('loginButton'); 
        const signUpButton = await findByTestId('signUpButton'); 
        expect(generalHome).toBeDefined(); 
        expect(loginButton).toBeDefined(); 
        expect(signUpButton).toBeDefined(); 
      });

  });

  describe('General Home Unit Testing', () => {
    let home;
    let instance;

    beforeEach(() => {
        home = create(<Home />);
        instance = home.getInstance();
    });

    it('Check initial state', () => {
        // Get class componenet's instance
        expect(instance.state).toEqual({ 
            cameraRollPer: null,
            disableButton: false,
            car: null,
            loader: false
        });
    });

    it('Calling componentDidMount function', () => {
        // Get class componenet's instance
        const componentDidMountSpy = jest.spyOn(Home.prototype, 'componentDidMount');
        instance.componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalled();
    });

  });