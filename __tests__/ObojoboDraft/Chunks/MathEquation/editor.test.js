import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import MathEquation from '../../../../ObojoboDraft/Chunks/MathEquation/editor'
const MATHEQUATION_NODE = 'ObojoboDraft.Chunks.MathEquation'

describe('MathEquation editor', () => {
	test('Node builds the expected component', () => {
		const Node = MathEquation.components.Node
		const component = renderer.create(<Node
			attributes={{dummy: 'dummyData'}}
			children={'mockChildren'}
			node={{
				data: {
					get: () => { return {}}
				}
			}}
			/>)
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	test('insertNode calls change methods', () => {
		const change = {}
		change.insertBlock = jest.fn().mockReturnValueOnce(change)
		change.collapseToStartOfNextText = jest.fn().mockReturnValueOnce(change)
		change.focus = jest.fn().mockReturnValueOnce(change)

		MathEquation.helpers.insertNode(change)

		expect(change.insertBlock).toHaveBeenCalled()
		expect(change.collapseToStartOfNextText).toHaveBeenCalled()
		expect(change.focus).toHaveBeenCalled()
	})

	test('slateToObo converts a Slate node to an OboNode with content', () => {
		const slateNode = {
			key: 'mockKey',
			type: 'mockType',
			data: {
				get: type => { return {} }
			},
			text: 'mockText'
		}
		const oboNode = MathEquation.helpers.slateToObo(slateNode)

		expect(oboNode).toMatchSnapshot()
	})

	test('oboToSlate converts an OboNode to a Slate node', () => {
		const oboNode = {
			id: 'mockKey',
			type: 'mockType',
			content: { width: 'large' }
		}
		const slateNode = MathEquation.helpers.oboToSlate(oboNode)

		expect(slateNode).toMatchSnapshot()
	})

	test('oboToSlate converts an OboNode to a Slate node with a caption', () => {
		const oboNode = {
			id: 'mockKey',
			type: 'mockType',
			content: {}
		}
		const slateNode = MathEquation.helpers.oboToSlate(oboNode)

		expect(slateNode).toMatchSnapshot()
	})

	test('plugins.renderNode renders a button when passed', () => {
		const props = {
			node: {
				type: MATHEQUATION_NODE,
				data: {
					get: () => { return {} }
				}
			}
		}

		expect(MathEquation.plugins.renderNode(props)).toMatchSnapshot()
	})
})
