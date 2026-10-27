import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import {
  ArrowLeft, Loader2, CheckCircle2, User, Mail, Building2, Briefcase,
  Users, MonitorPlay, CalendarDays, Globe,
} from "lucide-react";
import {
  getCountries, isValidPhoneNumber, parsePhoneNumberFromString, type CountryCode,
} from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/hooks/use-courses";
import { api } from "@/lib/api-client";
import PhoneField from "@/app/PhoneField";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const COUNTRIES: { iso: CountryCode; name: string }[] = getCountries()
  .map((iso) => ({ iso, name: regionNames.of(iso) ?? iso }))
  .sort((a, b) => a.name.localeCompare(b.name));

const isoOf = (name: string) => COUNTRIES.find((c) => c.name === name)?.iso;

const schema = z
  .object({
    firstName: z.string().trim().min(1, "Required"),
    lastName: z.string().trim().min(1, "Required"),
    email: z.string().email("Valid email required"),
    placeofRegistration: z.string().min(1, "Required"),
    phone: z.string(),
    organization: z.string(),
    jobTitle: z.string(),
    trainingMode: z.string(),
    trainingVenueopreference: z.string(),
    participants: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    message: z.string(),
  })
  .superRefine((v, ctx) => {
    const iso = isoOf(v.placeofRegistration);
    if (!iso || !isValidPhoneNumber(v.phone, iso)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Enter a valid phone number" });
    }
  });

type FormData = z.infer<typeof schema>;

const BLANK: FormData = {
  firstName: "", lastName: "", email: "", placeofRegistration: "", phone: "",
  organization: "", jobTitle: "", trainingMode: "", trainingVenueopreference: "",
  participants: "1", startDate: "", endDate: "", message: "",
};

const inputCls =
  "w-full rounded-lg border border-black dark:border-white bg-background px-3 py-2 text-sm outline-none " +
  "focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground/60";

const Field = ({ label, required, error, className = "", children }: {
  label: string; required?: boolean; error?: string; className?: string; children: React.ReactNode;
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {label}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

// shows the first error, only after the field was touched or submit was tried
const errorOf = (field: any): string | undefined => {
  if (!field.state.meta.isTouched) return undefined;
  const e = field.state.meta.errors[0];
  return typeof e === "string" ? e : e?.message;
};

export const Route = createFileRoute("/course-registration/$slug/register")({
  head: () => ({ meta: [{ title: "Register | Cynet East Africa Consultancy" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { slug = "" } = useParams({ from: "/course-registration/$slug/register" });
  const { data: course, isLoading } = useCourse(slug);

  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const form = useForm({
    defaultValues: BLANK,
    validators: { onChange: schema },
    onSubmit: async ({ value }) => {
      setServerError("");
      try {
        const e164 =
          parsePhoneNumberFromString(value.phone, isoOf(value.placeofRegistration))?.number ??
          value.phone;

        const msg = await api.registerForCourse({
          ...value,
          phone: e164,
          courseSlug: slug,
          courseName: course?.title ?? "",
          courseCategory: course?.categories?.[0]?.name ?? "",
        });
        setSuccessMessage(msg);
        setStatus("success");
      } catch (err) {
        setServerError((err as Error).message ?? "Something went wrong. Please try again.");
      }
    },
  });

  // one helper for the plain text-style fields
  const text = (
    name: keyof FormData,
    label: string,
    Icon: React.ElementType,
    opts: { required?: boolean; placeholder?: string; type?: string; min?: number } = {},
  ) => (
    <form.Field name={name}>
      {(field) => (
        <Field label={label} required={opts.required} error={errorOf(field)}>
          <div className="relative">
            <Icon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type={opts.type}
              min={opts.min}
              className={`${inputCls} pl-9`}
              placeholder={opts.placeholder}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        </Field>
      )}
    </form.Field>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-96 w-full animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <article className="bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link to="/course/$slug" params={{ slug } as any}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to course
          </Link>
        </Button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="text-2xl font-bold">Registration Received!</h1>
            <p className="max-w-sm text-muted-foreground">{successMessage}</p>
            <Button asChild className="mt-4">
              <Link to="/courses">Browse more courses</Link>
            </Button>
          </div>
        ) : (
          <form
            className="rounded-2xl border bg-card p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Reserve your seat
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Register for this program</h1>
            <p className="mt-2 text-muted-foreground">
              Complete the form and we'll confirm your spot within 24 hours.
            </p>

            {course?.title && (
              <Badge variant="secondary" className="mt-4 whitespace-normal text-left">
                📘 {course.title}
              </Badge>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {text("firstName", "First Name", User, { required: true, placeholder: "John" })}
              {text("lastName", "Last Name", User, { required: true, placeholder: "Doe" })}
              {text("email", "Email Address", Mail, { required: true, type: "email", placeholder: "john@example.com" })}

              <form.Field name="placeofRegistration">
                {(field) => (
                  <Field label="Country" required error={errorOf(field)}>
                    <div className="relative">
                      <Globe className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <select
                        className={`${inputCls} pl-9`}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        <option value="">Choose your country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.iso} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </Field>
                )}
              </form.Field>

              <form.Field name="phone">
                {(field) => (
                  <Field label="Phone Number" required error={errorOf(field)}>
                    <form.Subscribe selector={(s) => s.values.placeofRegistration}>
                      {(country) => (
                        <PhoneField
                          iso={isoOf(country)}
                          value={field.state.value}
                          onChange={field.handleChange}
                        />
                      )}
                    </form.Subscribe>
                  </Field>
                )}
              </form.Field>

              {text("organization", "Organization", Building2, { placeholder: "Your company" })}
              {text("jobTitle", "Job Title", Briefcase, { placeholder: "Your role" })}

              <form.Field name="trainingMode">
                {(field) => (
                  <Field label="Training Mode">
                    <div className="relative">
                      <MonitorPlay className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <select
                        className={`${inputCls} pl-9`}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        <option value="">Select mode</option>
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </Field>
                )}
              </form.Field>

              {text("trainingVenueopreference", "Training Venue of Preference", Briefcase, { placeholder: "Venue" })}
              {text("participants", "No. of Participants", Users, { type: "number", min: 1 })}
              {text("startDate", "Start Date", CalendarDays, { type: "date" })}
              {text("endDate", "End Date", CalendarDays, { type: "date" })}
            </div>

            <form.Field name="message">
              {(field) => (
                <Field label="Additional Information" className="mt-4">
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Any specific requirements or questions?"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {serverError && (
              <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <form.Subscribe selector={(s) => [s.isSubmitting, s.values.placeofRegistration] as const}>
              {([isSubmitting, country]) => (
                <Button
                  type="submit"
                  className="mt-6 w-full"
                  size="lg"
                  disabled={isSubmitting || !country}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>
    </article>
  );
}

export default RegisterPage;