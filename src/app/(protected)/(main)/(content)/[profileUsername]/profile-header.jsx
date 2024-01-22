import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { StatNumber } from "@/components/ui/stat-number";

export function ProfileHeader({ name, stat }) {
  return (
    <PageHeaderWrapper>
      <div className="w-full">
        <div className="font-bold leading-6 text-xl truncate">
          <span className="text-ellipsis whitespace-nowrap">
            {!name ? "Profile" : name}
          </span>
        </div>
        {name && (
          <div className="text-color-text-dimmed text-xs leading-4 overflow-hidden truncate">
            <span className="text-ellipsis whitespace-nowrap">
              <StatNumber stat={stat} />
              <span className="">{" posts"}</span>
            </span>
          </div>
        )}
      </div>
    </PageHeaderWrapper>
  );
}
