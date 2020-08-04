import React from 'react'
import {shallow} from 'enzyme'
import AllertPanel from './AllertPanel.component'

describe('AllertPanel test', () => {

    it('AllertPanel is rendering without crashing', ()=>{
        expect(shallow(<AllertPanel/>)).toMatchSnapshot();
    })
})