export function createRoute(router,fullPath = '/', options = {}) {
  let [path, query] = fullPath.split('?')
  query = query ? query.split('&').reduce((pre, cur) => { // ?a=1&b=2  ['a=1'], ['b=2']
    let [k, v] = cur.split('=')
    pre[k] = v
    return pre
  }, {}) : {}
  const route = {
    fullPath,
    hash: location.hash,
    matched: createMatched(router,path),
    meta: options.meta || {},
    name: location.name || options.name,
    params: location.params || options.params || {},
    path,
    query
  }
  return Object.freeze(route)
}

function createMatched(router, path) {
  let paths = path.split('/').filter(i => i !== ''), matched = [], index = 0,
    len = paths.length, parentPath = '/' + paths[index], matchedRoute, routes = router.options.routes
  if (!len) {
    matchedRoute = routes.find(i => i.path === '/')
    if (matchedRoute) {
      matched.push(matchedRoute)
    } else {
      return matched
    }
  }
  matchedRoute = routes.find(i => i.path === parentPath)
  if (matchedRoute) {
    matched.push(matchedRoute)
    routes = matchedRoute.children
  }
  while (index < len && routes) {
    index++
    matchedRoute = routes.find(i => i.path === paths[index])
    if (matchedRoute) {
      parentPath += '/' + paths[index]
      matched.push(Object.assign({}, matchedRoute, {path: parentPath}))
      routes = matchedRoute.children
    }
  }
  return matched
}
