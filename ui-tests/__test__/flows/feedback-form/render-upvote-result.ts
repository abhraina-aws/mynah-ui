import { expect, Page } from 'playwright/test';
import { getSelector, waitForAnimationEnd } from '../../helpers';
import testIds from '../../../../src/helper/test-ids';

export const renderUpvoteResult = async (page: Page, skipScreenshots?: boolean): Promise<void> => {
  await page.evaluate(() => {
    const selectedTabId = window.mynahUI.getSelectedTabId();
    if (selectedTabId != null) {
      window.mynahUI.updateStore(selectedTabId, {
        chatItems: [],
      });

      window.mynahUI.addChatItem(selectedTabId, {
        type: 'answer' as any,
        snapToTop: true,
        body: 'This message is votable.',
        canBeVoted: true,
      });
    }
  });
  await waitForAnimationEnd(page);

  const thumbsUp = page.locator(getSelector(testIds.chatItem.vote.upvoteLabel));
  expect(thumbsUp).toBeDefined();
  await thumbsUp.click();
  await waitForAnimationEnd(page);

  if (skipScreenshots !== true) {
    expect(await page.screenshot()).toMatchSnapshot();
  }
};
