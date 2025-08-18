'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const dailyDataSchema = z.object({
  totalAccountOpened: z.number().min(0),
  totalAccountClosed: z.number().min(0),
  numberArticleBooked: z.number().min(0),
  collectionAmount: z.number().min(0),
  ippbAccountOpened: z.number().min(0),
  ippbPremiumAccountOpened: z.number().min(0),
  generalInsurancePolicy: z.number().min(0),
  newPolicyIndexed: z.number().min(0),
  sumAssured: z.number().min(0),
  firstYearPremiumAmount: z.number().min(0),
  renewalPremiumAmount: z.number().min(0),
  aadhaarTransactions: z.number().min(0),
  aadhaarCollectionAmount: z.number().min(0),
  philatelyCount: z.number().min(0),
});

export function DailyDataForm({
  initialData,
  onSubmit,
  isSubmitted = false,
  canEdit = true,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form =
    useForm <
    DailyDataForm >
    {
      resolver: zodResolver(dailyDataSchema),
      defaultValues: {
        totalAccountOpened: initialData?.totalAccountOpened || 0,
        totalAccountClosed: initialData?.totalAccountClosed || 0,
        numberArticleBooked: initialData?.numberArticleBooked || 0,
        collectionAmount: initialData?.collectionAmount || 0,
        ippbAccountOpened: initialData?.ippbAccountOpened || 0,
        ippbPremiumAccountOpened: initialData?.ippbPremiumAccountOpened || 0,
        generalInsurancePolicy: initialData?.generalInsurancePolicy || 0,
        newPolicyIndexed: initialData?.newPolicyIndexed || 0,
        sumAssured: initialData?.sumAssured || 0,
        firstYearPremiumAmount: initialData?.firstYearPremiumAmount || 0,
        renewalPremiumAmount: initialData?.renewalPremiumAmount || 0,
        aadhaarTransactions: initialData?.aadhaarTransactions || 0,
        aadhaarCollectionAmount: initialData?.aadhaarCollectionAmount || 0,
        philatelyCount: initialData?.philatelyCount || 0,
      },
    };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      name: 'totalAccountOpened',
      label: 'Total Account Opened',
      section: 'accounts',
    },
    {
      name: 'totalAccountClosed',
      label: 'Total Account Closed',
      section: 'accounts',
    },
    {
      name: 'numberArticleBooked',
      label: 'Number of Articles Booked',
      section: 'postal',
    },
    {
      name: 'collectionAmount',
      label: 'Collection Amount (₹)',
      section: 'postal',
    },
    {
      name: 'ippbAccountOpened',
      label: 'IPPB Account Opened',
      section: 'ippb',
    },
    {
      name: 'ippbPremiumAccountOpened',
      label: 'IPPB Premium Account Opened',
      section: 'ippb',
    },
    {
      name: 'generalInsurancePolicy',
      label: 'General Insurance Policy',
      section: 'insurance',
    },
    {
      name: 'newPolicyIndexed',
      label: 'Number of New Policy Indexed',
      section: 'insurance',
    },
    { name: 'sumAssured', label: 'Sum Assured (₹)', section: 'insurance' },
    {
      name: 'firstYearPremiumAmount',
      label: 'First Year Premium Amount (₹)',
      section: 'premium',
    },
    {
      name: 'renewalPremiumAmount',
      label: 'Renewal Premium Amount (₹)',
      section: 'premium',
    },
    {
      name: 'aadhaarTransactions',
      label: 'Total Aadhaar Transactions',
      section: 'aadhaar',
    },
    {
      name: 'aadhaarCollectionAmount',
      label: 'Aadhaar Collection Amount (₹)',
      section: 'aadhaar',
    },
    {
      name: 'philatelyCount',
      label: 'Number of Philately',
      section: 'philately',
    },
  ];

  const sections = {
    accounts: 'Account Services',
    postal: 'Postal Services',
    ippb: 'IPPB Services',
    insurance: 'Insurance Services',
    premium: 'Premium Collection',
    aadhaar: 'Aadhaar Services',
    philately: 'Philately',
  };

  if (submitSuccess) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert>
            <AlertDescription>
              Daily data has been submitted successfully! You can download the
              PDF report now.
            </AlertDescription>
          </Alert>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() =>
                window.open(
                  '/api/reports/daily?date=' +
                    new Date().toISOString().split('T')[0]
                )
              }>
              Download PDF Report
            </Button>
            {canEdit && (
              <Button variant="outline" onClick={() => setSubmitSuccess(false)}>
                Edit Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-6">
        {Object.entries(sections).map(([sectionKey, sectionTitle]) => (
          <Card key={sectionKey}>
            <CardHeader>
              <CardTitle className="text-lg">{sectionTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields
                  .filter((field) => field.section === sectionKey)
                  .map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type="number"
                        min="0"
                        step={
                          field.name.includes('Amount') ||
                          field.name.includes('sumAssured')
                            ? '0.01'
                            : '1'
                        }
                        disabled={isSubmitted && !canEdit}
                        {...form.register(field.name, {
                          valueAsNumber: true,
                        })}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" disabled={isLoading}>
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isLoading || (isSubmitted && !canEdit)}>
            {isLoading ? 'Submitting...' : 'Submit Daily Data'}
          </Button>
        </div>
      </div>
    </form>
  );
}
