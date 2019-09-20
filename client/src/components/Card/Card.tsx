import React from "react";
//import { Trans } from "react-i18next";

const Card: React.FC<any> = ({ children, title }) => {
  return (
    <div className="panel">
      <div>
        { children }
        <h3>{title}</h3>
      </div>
    </div>
  )
};

export default Card;

const CountDownTimer: React.FC<any> = ({ clockState }) => {
  return (
    <>
      <span> {clockState.hours}</span>
      <span>:{clockState.mins}</span>
      <span>:{clockState.secs}</span>
    </>
  )
};

/** 
 * <Card title="Timer">
 *    <CountDownTimer />
 * </Card>
*/

/** 
 * <Card>
 *    <h1>{tasks.length}</h1>
 *    <Trans i18nKey="home.totalTasks">total tasks</Trans>
 * </Card>
*/













/** TotalTasks.tsx
 *  <div className="panel">
      <div>
        <h1>{tasks.length}</h1>
        <Trans i18nKey="home.totalTasks">total tasks</Trans>
      </div>
    </div>
 */

/** Clock.tsx
 * <div className="panel">
      <div>
        <h1>
          <span> {clockState.hours}</span>
          <span>:{clockState.mins}</span>
          <span>:{clockState.secs}</span>
        </h1>
        <Trans i18nKey="home.timeLeft">to finish this day</Trans>
      </div>
    </div>
 */
