import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import BookmarkButton from './BookmarkButton.component';
import {saveRecipeStart, unsaveRecipeStart} from '../../redux/recipes/recipes.actions'

 
const mockStore = configureStore([]);

describe('Bookmark button tests', () => {
    let store;
    let component;
    let mockProps;
   
    beforeEach(() => {
        store = mockStore({
          user:{currentUser:{authID:'12345'}},
          recipes:{recipes:{savingRecipe:false}},
        });

        store.dispatch=jest.fn()

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
   
    it('should dispatch an action [unsaveRecipe] if recipe.users includes currentUser ', () => {
        renderer.act(() => {
            component.root.findByProps({id:'bookmarkButton'}).props.onClick();
          });
       
          expect(store.dispatch).toHaveBeenCalledTimes(1);
          expect(store.dispatch).toHaveBeenCalledWith(unsaveRecipeStart({_id:'a123', users:['54355']}));
        });



    it('should dispatch an action [unsaveRecipe] if recipe.users includes currentUser ', () => {
            mockProps={
                classes:{bookmark:null, icon:null},
                recipe:{
                    _id:'a123',
                    users:['54355']
            }
        }

        component = renderer.create(
            <Provider store={store}>
              <BookmarkButton {...mockProps}/>
            </Provider>
          );


            renderer.act(() => {
                component.root.findByProps({id:'bookmarkButton'}).props.onClick();
              });

           
              expect(store.dispatch).toHaveBeenCalledTimes(1);
              expect(store.dispatch).toHaveBeenCalledWith(saveRecipeStart({_id:'a123', users:['54355', '12345']}));
            });
  });

  