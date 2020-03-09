import * as React from "react";
import "./index.scss";

const giftTags = {
  tags: [
    {
      name: "Accuracy",
      alias: "On Target",
    },
    {
      name: "Ambition",
      alias: "Eye On The Prize",
    },
    {
      name: "Charisma",
      alias: "Like A Charm",
    },
    {
      name: "Clarity",
      alias: "Blue Sky",
    },
    {
      name: "Compassion",
      alias: "Open Hand",
    },
    {
      name: "Consistency",
      alias: "An Apple A Day",
    },
    {
      name: "Courage",
      alias: "Nerves Of Steel",
    },
    {
      name: "Curiosity",
      alias: "Curious Cat",
    },
    {
      name: "Diligence",
      alias: "Rolled Sleeves",
    },
    {
      name: "Directness",
      alias: "Matter Of Fact",
    },
    {
      name: "Discipline",
      alias: "Sweat",
    },
    {
      name: "Easygoing",
      alias: "Breath Of Fresh Air",
    },
    {
      name: "Endurance",
      alias: "Rain Or Shine",
    },
    {
      name: "Energy",
      alias: "Wind Mill",
    },
    {
      name: "Enthusiasm",
      alias: "Big Fan",
    },
    {
      name: "Fearlessness",
      alias: "On A Limb",
    },
    {
      name: "Flow",
      alias: "Time Flies",
    },
    {
      name: "Focus",
      alias: "The Zone",
    },
    {
      name: "Friendliness",
      alias: "Social Butterfly",
    },
    {
      name: "Good Humor",
      alias: "Icebreaker",
    },
    {
      name: "Grace",
      alias: "Guest Room",
    },
    {
      name: "Humility",
      alias: "Jade Brick",
    },
    {
      name: "Intuition",
      alias: "Gut Feeling",
    },
    {
      name: "Inventiveness",
      alias: "Sliced Bread",
    },
    {
      name: "Leadership",
      alias: "Take Charge",
    },
    {
      name: "Listening",
      alias: "Careful Ear",
    },
    {
      name: "Loyalty",
      alias: "True Blue",
    },
    {
      name: "Mastery",
      alias: "One Fell Swoop",
    },
    {
      name: "Openness",
      alias: "Door Stop",
    },
    {
      name: "Opportunistic",
      alias: "Go Getter",
    },
    {
      name: "Ownership",
      alias: "Heart",
    },
    {
      name: "Patience",
      alias: "The Key",
      description:
        "You held open the door for people, even if they were a bit far away.",
    },
    {
      name: "Persistence",
      alias: "Short Order",
    },
    {
      name: "Perspective",
      alias: "Bird's Eye View",
    },
    {
      name: "Persuasion",
      alias: "Silver Tongue",
    },
    {
      name: "Positivity",
      alias: "Full Glass",
    },
    {
      name: "Pride",
      alias: "Showstopper",
    },
    {
      name: "Prudence",
      alias: "Down To Earth",
    },
    {
      name: "Punctuality",
      alias: "Earlybird",
    },
    {
      name: "Quickness",
      alias: "Like The Wind",
    },
    {
      name: "Reliability",
      alias: "Sure Thing",
    },
    {
      name: "Respect",
      alias: "The Nod",
    },
    {
      name: "Risktaking",
      alias: "Down To Mars",
    },
    {
      name: "Sensitivity",
      alias: "Pitch Perfect",
    },
    {
      name: "Seriousness",
      alias: "Dash Of Salt",
    },
    {
      name: "Sharpness",
      alias: "Cutting Edge",
    },
    {
      name: "Something To Prove",
      alias: "Underdog",
    },
    {
      name: "Spontaneity",
      alias: "Bubble Wand",
    },
    {
      name: "Timely",
      alias: "Metronome",
    },
    {
      name: "Tolerance",
      alias: "Good Sport",
    },
  ],
};

export class GiftTaggerApp extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="gt-gift-tag-container">
        {giftTags.tags.map(this.renderGiftTag)}
      </div>
    );
  }

  private renderGiftTag = (
    tag: { name: string; alias: string; description?: string },
    i: number,
  ) => {
    return (
      <div key={i} className="gt-gift-tag-box grid-large">
        <div className="gt-tag-icon" />
        <div className="gt-tag-content">
          <div className="gt-tag-name">{tag.name}</div>
          <div className="gt-tag-alias">{tag.alias}</div>
          <div className="gt-tag-desc">{tag.description}</div>
        </div>
      </div>
    );
  };
}
