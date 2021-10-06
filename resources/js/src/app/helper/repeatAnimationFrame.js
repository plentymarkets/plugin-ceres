/**
 * Request animation frames calling a handler function repeatingly until the returned callback is called.
 *
 * @param {function} handler    The handler to be executed when running each animation frame
 * @returns {function(): void}  Callback function to stop execution of animation frames.
 */
export function repeatAnimationFrame(handler)
{
    let currentAnimationFrame;

    const next = () =>
    {
        currentAnimationFrame = requestAnimationFrame(animationFrameHandler);
    };

    const animationFrameHandler = () =>
    {
        handler();
        next();
    };

    next();

    return () =>
    {
        cancelAnimationFrame(currentAnimationFrame);
    };
}
