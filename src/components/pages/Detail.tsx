"use client";

import type { SteamApiResponse } from "@/types/SteamApiResponse";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  memo: string;
  clearDate: string;
  clearDurationHours: number;
  clearDurationMinutes: number;
  clearDurationSeconds: number;
};

type Props = {
  fileid: string;
  detailData: SteamApiResponse["response"]["publishedfiledetails"][0];
};

export const Detail = ({ fileid, detailData }: Props) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      clearDate: new Date().toISOString().split("T")[0],
      clearDurationHours: 0,
      clearDurationMinutes: 0,
      clearDurationSeconds: 0,
      memo: "",
    },
  });

  const onClickCopy = () => {
    const formValues = {
      title: detailData.title,
      clearDate: watch("clearDate"),
      duration: {
        hours: watch("clearDurationHours"),
        minutes: watch("clearDurationMinutes"),
        seconds: watch("clearDurationSeconds"),
      },
      memo: watch("memo"),
    };

    const copyText = [
      formValues.title,
      formValues.clearDate,
      `${formValues.duration.hours}:${formValues.duration.minutes}:${formValues.duration.seconds}`,
      formValues.memo,
    ].join("\n");

    navigator.clipboard.writeText(copyText);
    setCopySuccess(true);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(fileid);
    console.log(data);
  };

  return (
    <div>
      <main className="responsive">
        <div className="top-margin">
          <div className="grid">
            <div className="s2">
              <img
                alt={detailData.title}
                src={
                  detailData.preview_url ||
                  "https://community.fastly.steamstatic.com/public/images/sharedfiles/steam_workshop_default_image.png"
                }
                className="responsive round"
              />
            </div>
            <div className="s10">
              <h2>{detailData.title}</h2>
              <p>
                <a
                  href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${detailData.publishedfileid}`}
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://steamcommunity.com/sharedfiles/filedetails/?id=${detailData.publishedfileid}`}
                </a>
              </p>
              <div className="flex top-margin">
                {detailData.tags.map((tag) => (
                  <span key={tag.tag} className="chip">
                    {tag.display_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p>{detailData.file_description}</p>

        <div className="grid">
          <div className="s12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend>Your Memo</legend>
                <div className="field border label prefix">
                  <i>calendar_month</i>
                  <input
                    type="date"
                    className="active"
                    {...register("clearDate")}
                  />
                  <label htmlFor="clearDate" className="active">
                    Clear Date
                  </label>
                </div>

                <div className="label">
                  <label htmlFor="clearDuration" className="active">
                    Clear Duration
                  </label>
                  <div className="grid">
                    <div className="field label s4">
                      <input
                        type="number"
                        min={0}
                        className="active"
                        {...register("clearDurationHours")}
                      />
                      <label htmlFor="clearDurationHours" className="active">
                        hours
                      </label>
                    </div>
                    <div className="field label s4">
                      <input
                        type="number"
                        min={0}
                        max={59}
                        className="active"
                        {...register("clearDurationMinutes")}
                      />
                      <label htmlFor="clearDurationMinutes" className="active">
                        minutes
                      </label>
                    </div>
                    <div className="field label s4">
                      <input
                        type="number"
                        min={0}
                        max={59}
                        className="active"
                        {...register("clearDurationSeconds")}
                      />
                      <label htmlFor="clearDurationSeconds" className="active">
                        seconds
                      </label>
                    </div>
                  </div>
                </div>

                <div className="field border label textarea">
                  <textarea
                    id="memo"
                    className="active"
                    {...register("memo")}
                  />
                  <label htmlFor="memo" className="active">
                    Impressions
                  </label>
                </div>

                <div className="field border label">
                  <nav className="no-space">
                    <button
                      className="border left-round"
                      type="submit"
                      disabled
                    >
                      <i>save</i>
                      <span>Save</span>
                    </button>
                    <button
                      className="border right-round"
                      type="button"
                      onClick={onClickCopy}
                    >
                      <i>content_copy</i>
                      <span>{copySuccess ? "Copied" : "Copy"}</span>
                    </button>
                  </nav>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </main>

      <div className="snackbar primary top" id="success-copy">
        <span>Copied to clipboard</span>
      </div>
    </div>
  );
};
