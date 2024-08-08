"use client"
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topBarSchema } from "@/schemas/headerSchema";
import { z } from "zod";

const TopBarForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(topBarSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const onSubmit = async (data: z.infer<typeof topBarSchema>) => {
    const response = await fetch("/api/top-bar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // handle success
    } else {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Top Bar</h2>

      <div>
        <label className="block font-semibold">Phone</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input {...field} className="w-full p-2 border rounded" />
          )}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message as string}</p>}
      </div>

      <div>
        <label className="block font-semibold">Get Help</label>
        <Controller
          name="getHelp"
          control={control}
          render={({ field }) => (
            <input {...field} className="w-full p-2 border rounded" />
          )}
        />
        {errors.getHelp && <p className="text-red-500">{errors.getHelp.message as string}</p>}
      </div>

      <div>
        <label className="block font-semibold">Social Links</label>
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <div className="flex space-x-2">
              <Controller
                name={`socialLinks.${index}.platform`}
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Platform" className="w-full p-2 border rounded" />
                )}
              />
              <Controller
                name={`socialLinks.${index}.url`}
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="URL" className="w-full p-2 border rounded" />
                )}
              />
              <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
            </div>
            {errors.socialLinks?.[index]?.platform && (
              <p className="text-red-500">{errors.socialLinks[index].platform?.message as string}</p>
            )}
            {errors.socialLinks?.[index]?.url && (
              <p className="text-red-500">{errors.socialLinks[index].url?.message as string}</p>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ platform: "", url: "" })} className="p-2 bg-blue-500 text-white rounded">Add Social Link</button>
      </div>

      <button type="submit" className="p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
};

export default TopBarForm;
