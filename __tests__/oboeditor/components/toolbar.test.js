import { shallow } from 'enzyme'
import React from 'react'

import Toolbar from '../../../src/scripts/oboeditor/components/toolbar'

describe('Editor Toolbar', () => {
	test('Node component', () => {
		const Node = Toolbar.components.Node
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Node component toggles Basic Mark', () => {
		window.prompt = jest.fn().mockReturnValueOnce(null)
		const Node = Toolbar.components.Node
		const change = {
			toggleMark: jest.fn()
		}
		const component = shallow(
			<Node
				value={{
					change: () => change
				}}
				onChange={jest.fn()}
			/>
		)
		const tree = component.html()

		component
			.find('button')
			.at(5)
			.simulate('click', { preventDefault: jest.fn() })

		expect(tree).toMatchSnapshot()
		expect(change.toggleMark).toHaveBeenCalled()
	})

	test('Node component toggles Link', () => {
		window.prompt = jest.fn().mockReturnValueOnce(null)
		const Node = Toolbar.components.Node
		const change = {
			addMark: jest.fn(),
			removeMark: jest.fn()
		}
		const component = shallow(
			<Node
				value={{
					change: () => change,
					marks: {
						forEach: funct => {
							const mark = {
								type: 'a',
								data: { get: () => 1, toJSON: () => ({}) }
							}
							return funct({ type: 'mockMark' }) || funct(mark)
						}
					}
				}}
				onChange={jest.fn()}
			/>
		)
		const tree = component.html()

		component
			.find('button')
			.at(6)
			.simulate('click', { preventDefault: jest.fn() })

		expect(tree).toMatchSnapshot()
		expect(change.addMark).toHaveBeenCalled()
		expect(change.removeMark).toHaveBeenCalled()
	})

	test('Node component toggles Superscript', () => {
		const Node = Toolbar.components.Node
		const change = {
			removeMark: jest.fn()
		}
		const component = shallow(
			<Node
				value={{
					change: () => change,
					marks: {
						some: funct => {
							const mark = {
								type: 'sup',
								data: { get: () => 1 }
							}
							return funct({ type: 'mockMark' }) || funct(mark)
						}
					}
				}}
				onChange={jest.fn()}
			/>
		)
		const tree = component.html()

		component
			.find('button')
			.at(7)
			.simulate('click', { preventDefault: jest.fn() })

		expect(tree).toMatchSnapshot()
		expect(change.removeMark).toHaveBeenCalled()
	})

	test('Node component toggles Subscript', () => {
		const Node = Toolbar.components.Node
		const change = {
			addMark: jest.fn()
		}
		const component = shallow(
			<Node
				value={{
					change: () => change,
					marks: {
						some: funct => {
							return funct({ type: 'mockMark' })
						}
					}
				}}
				onChange={jest.fn()}
			/>
		)
		const tree = component.html()

		component
			.find('button')
			.at(8)
			.simulate('click', { preventDefault: jest.fn() })

		expect(tree).toMatchSnapshot()
		expect(change.addMark).toHaveBeenCalled()
	})

	test('Bold component', () => {
		const Node = Toolbar.components.Bold
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Italics component', () => {
		const Node = Toolbar.components.Italics
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Strike component', () => {
		const Node = Toolbar.components.Strike
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Quote component', () => {
		const Node = Toolbar.components.Quote
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Monospace component', () => {
		const Node = Toolbar.components.Monospace
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Latex component', () => {
		const Node = Toolbar.components.Latex
		const component = shallow(<Node />)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Link component', () => {
		const Node = Toolbar.components.Link
		const component = shallow(
			<Node
				mark={{
					data: { get: () => '/view/00000000-0000-0000-0000-000000000000' }
				}}
			/>
		)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Superscript component', () => {
		const Node = Toolbar.components.Superscript
		const component = shallow(
			<Node
				mark={{
					data: { get: () => 1 }
				}}
			/>
		)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})

	test('Subscript component', () => {
		const Node = Toolbar.components.Superscript
		const component = shallow(
			<Node
				mark={{
					data: { get: () => -1 }
				}}
			/>
		)
		const tree = component.html()
		expect(tree).toMatchSnapshot()
	})
})
