import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import BookmarkButton from './BookmarkButton.component';
 
const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
    let store;
    let component;
    let mockProps;
   
    beforeEach(() => {
        store = mockStore({
          user:{currentUser:{authID:'12345'}},
          recipes:{recipes:{savingRecipe:false}}
        });

        mockProps={
            classes:{bookmark:null, icon:null},
            recipe:{
                _id:'a123',
                users:['54355', '12345']
        }
    }
     
        component = renderer.create(
          <Provider store={store}>
            <BookmarkButton {...mockProps}/>
          </Provider>
        );
      });
   
    it('Bookmark button should render without crashing', () => {
        expect(component).toMatchSnapshot()
    });
   
    it('should dispatch an action on button click', () => {
   
    });
  });