import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <DataTable
                  data={[
                    {
                      id: 1,
                      header: 'Cover page',
                      type: 'Cover page',
                      status: 'In Process',
                      target: '18',
                      limit: '5',
                      reviewer: 'Eddie Lake',
                    },
                    {
                      id: 2,
                      header: 'Table of contents',
                      type: 'Table of contents',
                      status: 'Done',
                      target: '29',
                      limit: '24',
                      reviewer: 'Eddie Lake',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
