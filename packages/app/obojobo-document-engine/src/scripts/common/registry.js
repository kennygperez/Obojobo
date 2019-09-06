let items
let defaults
let registeredToolbarItems
let toolbarItems
let variableHandlers

class _Registry {
	init() {
		items = new Map()
		defaults = new Map()
		toolbarItems = []
		variableHandlers = new Map()
		registeredToolbarItems = {
			separator: { id: 'separator', type: 'separator' }
		}
	}

	loadDependency(url, onLoadCallback = () => {}) {
		const type = url.substr(url.lastIndexOf('.') + 1)

		switch (type) {
			case 'js': {
				const el = document.createElement('script')
				el.setAttribute('src', url)
				el.onload = onLoadCallback
				document.head.appendChild(el)
				break
			}

			case 'css': {
				const el = document.createElement('link')
				el.setAttribute('rel', 'stylesheet')
				el.setAttribute('href', url)
				document.head.appendChild(el)
				onLoadCallback()
				break
			}
		}

		return this
	}

	cloneBlankNode(templateObject) {
		return JSON.parse(JSON.stringify(templateObject))
	}

	registerModel(className, opts = {}) {
		const item = items.get(className)
		if (item) opts = Object.assign(opts, item)

		opts = Object.assign(
			{
				type: null,
				default: false,
				variables: {},
				templateObject: '',
				init() {}
			},
			opts
		)

		opts.cloneBlankNode = this.cloneBlankNode.bind(this, opts.templateObject)

		items.set(className, opts)

		if (opts.default) {
			defaults.set(opts.type, className)
		}

		opts.init()

		for (const variable in opts.variables) {
			const cb = opts.variables[variable]
			variableHandlers.set(variable, cb)
		}

		return this
	}

	getDefaultItemForModelType(modelType) {
		const type = defaults.get(modelType)
		if (!type) {
			return null
		}
		return items.get(type)
	}

	getItemForType(type) {
		return items.get(type)
	}

	registerToolbarItem(opts) {
		registeredToolbarItems[opts.id] = opts
		return this
	}

	addToolbarItem(id) {
		toolbarItems.push(Object.assign({}, registeredToolbarItems[id]))
		return this
	}

	getItems(callback) {
		return callback(items)
	}

	getTextForVariable(variable, model, viewerState) {
		const cb = variableHandlers.get(variable)
		if (!cb) {
			return null
		}

		return cb.call(null, model, viewerState)
	}

	get registeredToolbarItems() {
		return registeredToolbarItems
	}

	get toolbarItems() {
		return toolbarItems
	}
}

const Registry = new _Registry()

Registry.init()
export { Registry }
