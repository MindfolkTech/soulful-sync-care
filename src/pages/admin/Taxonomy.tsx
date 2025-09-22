import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const TaxonomyTable = ({ title, data, columns }: { title: string, data: any[], columns: string[] }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button size="sm"><PlusCircle className="w-4 h-4 mr-2" /> Add New</Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map(col => <TableHead key={col}>{col}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(item => (
                        <TableRow key={item.id}>
                            {columns.map(col => <TableCell key={col}>{item[col]}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);


export default function AdminTaxonomy() {
  const [professionalBodies, setProfessionalBodies] = useState<any[]>([]);
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: bodies } = await supabase.from('professional_bodies').select('*');
      const { data: specs } = await supabase.from('specialities').select('*');
      const { data: langs } = await supabase.from('languages').select('*');
      setProfessionalBodies(bodies || []);
      setSpecialities(specs || []);
      setLanguages(langs || []);
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
            <div className="space-y-4">
                <h1 className="font-primary text-3xl">Taxonomy Management</h1>
                <p className="text-muted-foreground">Manage the lists used throughout the platform.</p>
                <Tabs defaultValue="bodies" className="w-full">
                    <TabsList>
                        <TabsTrigger value="bodies">Professional Bodies</TabsTrigger>
                        <TabsTrigger value="specialities">Specialities</TabsTrigger>
                        <TabsTrigger value="languages">Languages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bodies" className="mt-4">
                        <TaxonomyTable title="Professional Bodies" data={professionalBodies} columns={['abbreviation', 'name', 'region']} />
                    </TabsContent>
                    <TabsContent value="specialities" className="mt-4">
                        <TaxonomyTable title="Specialities" data={specialities} columns={['name', 'description']} />
                    </TabsContent>
                    <TabsContent value="languages" className="mt-4">
                         <TaxonomyTable title="Languages" data={languages} columns={['name', 'iso_code']} />
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
      </div>
    </AdminLayout>
  );
}


