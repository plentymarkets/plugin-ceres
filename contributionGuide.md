![plentymarkets Logo](http://www.plentymarkets.eu/layout/pm/images/logo/plentymarkets-logo.jpg)

# Ceres Contribution Guide

## So you want to contribute to the development of Ceres?

Ceres is an open source project. As a part of our community, you can add features, help fixing bugs, or improve our codebase. To do so, you will need to open a pull request on GitHub, which our developers will then assess and, if everything is all right, approve and merge. This document outlines the requirements for your contributions.
Thanks a lot for being a part of our community!

## Talk to us

Whether you're planning to contribute a feature or fix a bug, we will have to assess your code and decide whether or not we can include it in a future release. We don't want you to invest a lot of time and effort into a contribution that we cannot accept. However, there are certain limitations to which contributions we can implement: In some cases, internal dependencies to the plentymarkets core may impede the inclusion of a feature; in other cases, our LTS (long-term support)
promise for Ceres 5.0.X prevents us from accepting your contribution, because it may lead to breaking changes for external plugins.

That is why you should talk to us before you begin working on a larger contribution to Ceres. We're offering regular office hours with our developers, in which you can present and discuss your ideas with our developers. Visit [our forum thread](https://forum.plentymarkets.com/t/regelmaessige-entwicklersprechstunden-regular-developers-talks/637295) for more information.

If you can't make time for the office hours, just open a new thread [in the Ceres category in the forum](https://forum.plentymarkets.com/c/ceres-webshop/). Tag the new post with the tag **Contribution**. Briefly explain what you're planning to do and how you would go about. Our developers will have a look at your input and contact you to discuss whether it's possible or not.

## Which contributions will not be accepted?

It's hard to say. Mainly, we reserve the right to reject your contribution if:

- it does not meet the standards we set for ourselves. This includes, for instance, sloppy code formatting or negligence of security issues.
- it is not feasible within the Ceres LTS version. If your contribution constitutes breaking changes in the update process to which other plugin developers have to react, it will most likely not find its way into a release of Ceres v5.0.X.
- it cannot be integrated without significant changes to the plentymarkets core. Sometimes, contributions may interact with other portions of the system in ways that are not obvious to external developers, who do not have access to the core.

## Contributing bug fixes

If you want to help improve plentyShop by contributing bug fixes, you can find a list of all currently known bugs in the [issues column on GitHub](https://github.com/plentymarkets/plugin-ceres/issues). Each individual entry on the issues board includes a link to the corresponding thread in the forum, if you need further information.

If you find a bug that's not on the GitHub issues board, let us know by opening a new thread [in the Ceres category in the forum](https://forum.plentymarkets.com/c/ceres-webshop/). Include detailed information on how to reproduce the bug. This includes:

- the plugin version(s) in which the bug appears
- the browser(s) you're using and its version
- the date when you first encountered the bug
- a detailed description of the faulty behaviour you've encountered and an outline of which behaviour you would have expected
- (if applicable) screenshots or animated GIFs of the faulty behaviour
- (if applicable) error notifications from developers tools 

If you're willing to take on the bug fix yourself, please let us know that you are working on it.

## Improving the codebase

While we're always striving to improve the code documentation in the project, there's still much to be done. If you encounter a method that has not been documented properly and want to contribute helpful code comments, you can open a pull request as described below.

## How to do it

1. Fork the Ceres repository on GitHub by clicking the **Fork** button in the upper right corner.
2. [Clone](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) the forked repository.
3. Create a new **branch** on which you will implement your changes.
4. Make sure to name the branch adequately.
5. Make your changes (e.g. a bug fix) in the cloned repository.
6. Once you are done, **commit** your changes to the branch you created.
7. Create a pull request. Always create pull requests against our **stable** branch!
8. Use the appropriate labels on GitHub (e.g. **Translations required** if your PR includes text).
9. Mention **@plentymarkets-ceres-io** in the description of your pull request.
10. Add a few sentences that describe the changes you've made in the description of the pull request.

After you've opened a pull requests, the PR will be subject to our automated tests. If one or more of the checks is failing, please consider the proposed adjustments to your pull request. If it's unclear why the test failed, make sure to contact us either by mentioning **@plentymarkets-ceres-io** in the PR's conversation or by opening a new thread in the forum. 

If your contribution requires additional documentation on our part, please also mention GitHub user **fmutschler** in the PR conversation or user **franz.mutschler** in the forum.

## Branch naming

The branches you create should follow the following naming convention:
- Branches for bug fixes should always begin with the prefix **fix** and a slash, e.g. "fix/sticky_container_div".
- Branches for features should always begin with the prefix **feature** and a slash, e.g. "feature/order_details_popup".

If your changes require **beta** or **early**, please indicate this by adding a corresponding **beta** or **early** tag to your pull requests.

## Resources

You can find our developers documentation [here](https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/template-setup.html).
Our [manual](https://knowledge.plentymarkets.com/webshop/ceres-einrichten) can also help you identify which contributions could be a worthwile endeavour.

