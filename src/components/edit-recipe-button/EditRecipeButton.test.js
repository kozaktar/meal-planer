import React from 'react'
import {shallow} from 'enzyme'
import {EditRecipeButton} from './EditRecipeButton.component'

describe('AllertPanel test', () => {

    it('EditRecipeButton is rendering without crashing', ()=>{
        expect(shallow(<EditRecipeButton/>)).toMatchSnapshot();
    })
})