
/**
 * Wrap a function that tracks the number of times it is invoked.
 * The count is visible within the property `calls`.
 * @param {Function} func the function to wrap
 * @returns {Function & { calls: number } }
 */
export function countCalls(func) {
    function wrapped(...args) {
        wrapped.calls += 1
        return func(...args)
    }
    wrapped.calls = 0
    return wrapped
}
