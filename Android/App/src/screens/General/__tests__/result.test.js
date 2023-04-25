import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Result from '../result';
import { shallow } from 'enzyme';



describe('Testing Result Page', () => {
    let wrapper;
    const navigation = {
        navigate: jest.fn()
    };
      
    const route = {
        params: {
            car: 'carname'
        }
    };

    const firestore = {
        collection: jest.fn().mockReturnThis(), get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue({ pname: 'carname' }) })
      };

    beforeEach(() => {
        wrapper = shallow(<Result navigation={navigation} route={route} firestore={firestore} />);
    });

    it('Testing Render Result Page', () => {
        expect(wrapper).toBeTruthy();
      });
    

    it('Testing navigate to home page', () => {
        const homeButton = wrapper.find('TouchableOpacity').at(0);
    
        homeButton.simulate('press');
        expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
    
    // it('should update state with fetched car data', async () => {
    //     await wrapper.instance().componentDidMount();
    //     expect(wrapper.state().car).toEqual({ pname: 'teslamodel' });
    // });
});